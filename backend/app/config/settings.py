
from pydantic_settings import BaseSettings  # Importé de pydantic-settings maintenant

class Settings(BaseSettings):
    SECRET_KEY: str = "1226249db6106785b3767aa8c25927644354d9ae3f2038c9b32227f7f60604af"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()