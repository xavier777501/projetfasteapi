from app.crud.user import create_user
from app.core.hashing import hash_password

def register_user(db, email, username, password, is_worker):
    try:
        hashed_pw = hash_password(password)
        return create_user(db, email, username, hashed_pw, is_worker)
    except Exception as e:
        raise Exception(str(e))