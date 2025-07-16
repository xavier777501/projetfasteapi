from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.models.user import User
from app.config.database import engine

app = FastAPI()

# Créer les tables au démarrage
User.metadata.create_all(bind=engine)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Accepte toutes les origines
    allow_credentials=True,
    allow_methods=["*"],  # Toutes les méthodes HTTP
    allow_headers=["*"],  # Tous les en-têtes
    expose_headers=["*"],  # Expose tous les en-têtes
    max_age=3600  # Cache les pré-vols pendant 1 heure
)

# Middleware d'erreur personnalisé
@app.exception_handler(Exception)
async def custom_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
        headers={"Access-Control-Allow-Origin": "http://localhost:3000"}
    )


# Incluez vos routes après la configuration CORS
from app.routers import auth
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API"}
