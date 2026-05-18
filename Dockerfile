FROM node:20-alpine AS frontend-build
WORKDIR /src/frontend

COPY Frontend/WeatherUI/package*.json ./
RUN npm install

COPY Frontend/WeatherUI/ ./
RUN npm run build --configuration=production

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-build
WORKDIR /src/backend

COPY Backend/WeatherAPI/WeatherAPI.csproj ./
RUN dotnet restore "./WeatherAPI.csproj"

COPY Backend/WeatherAPI/ ./

COPY --from=frontend-build /src/frontend/dist/WeatherUI/browser ./wwwroot

RUN dotnet publish "WeatherAPI.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

EXPOSE 8080

COPY --from=backend-build /app/publish .

ENTRYPOINT ["dotnet", "WeatherAPI.dll"]