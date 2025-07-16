from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserResponse, UserCreateRequest
from app.services.auth_service import create_user
from app.core.security import create_access_token, oauth2_scheme, get_current_user
from app.crud.user import get_user_by_email
from app.config.database import get_session
from app.core.hashing import verify_password, hash_password
import logging

logger = logging.getLogger(__name__)



from datetime import timedelta





router = APIRouter()

@router.post("/auth/register")
async def register_user(user: UserCreateRequest, db: Session = Depends(get_session)):
    try:
        # Hasher le mot de passe avant de créer l'utilisateur
        hashed_password = hash_password(user.password)
        logger.info(f"Attempting to create user with email: {user.email}")
        
        # Vérifier si l'email existe déjà
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cet email est déjà utilisé. Veuillez utiliser un email différent."
            )
        
        created_user = create_user(db, user.email, user.username, hashed_password, user.is_worker)
        # Créer un token pour l'utilisateur nouvellement créé
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        return {
            "message": "User created successfully",
            "user_id": created_user.id,
            "access_token": access_token,
            "token_type": "bearer",
            "is_worker": user.is_worker
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error during user creation: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Une erreur est survenue lors de la création du compte"
        )

@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_session)):
    try:
        logger.info(f"Attempting login for username: {form_data.username}")
        user = get_user_by_email(db, form_data.username)
        
        if user is None:
            logger.error(f"User not found for username: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        logger.info(f"User found: {user.email}")
        if not verify_password(form_data.password, user.hashed_password):
            logger.error(f"Incorrect password for user: {user.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        logger.info(f"Password verified for user: {user.email}")
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        logger.info(f"Successfully created token for user: {user.email}")
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "is_worker": user.is_worker
        }
    except Exception as e:
        logger.error(f"Error during login: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"}
        )

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

