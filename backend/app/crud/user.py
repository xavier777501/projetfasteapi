from sqlalchemy.orm import Session
from app.models.user import User

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, email: str, username: str, hashed_password: str, is_worker: bool):
    # Vérifier si l'email existe déjà
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise ValueError("Cet email est déjà utilisé. Veuillez utiliser un email différent.")
    
    db_user = User(
        email=email,
        username=username,
        hashed_password=hashed_password,
        is_worker=is_worker
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user