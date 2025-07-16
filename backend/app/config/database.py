from sqlmodel import create_engine, Session

DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def get_session():
    with Session(bind=engine) as session:
        yield session