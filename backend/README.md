
# Railway Deployment Setup for digi-quantum-analytics

## 🚀 Quick Setup

1. Push this project to GitHub (if not already).
2. Go to [https://railway.app](https://railway.app) → New Project → Deploy from GitHub.
3. In Railway dashboard:
   - **Build command**: `./mvnw clean package -DskipTests`
   - **Start command** (from Procfile): `java -jar target/peer-link-0.0.1-SNAPSHOT.jar`
4. Set environment variable: `JAVA_VERSION = 17`

This project includes Maven Wrapper so Railway doesn’t need Maven preinstalled.
