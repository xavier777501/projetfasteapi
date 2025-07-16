# app/schemas/user.py

from pydantic import BaseModel, validator
import re

class UserCreateRequest(BaseModel):
    email: str
    username: str
    password: str
    is_worker: bool = False

    @validator('email')
    def validate_email(cls, value):
        # Expression régulière simple pour vérifier le format e-mail
        if not re.match(r"[^@]+@[^@]+\.[^@]+", value):
            raise ValueError('Adresse e-mail invalide')
        return value

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_worker: bool