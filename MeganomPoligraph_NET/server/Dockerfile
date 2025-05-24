# === BASE STAGE ===
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS base
WORKDIR /app

# === CONFIG STAGE ===
FROM base AS config
WORKDIR /app

RUN echo '{ \
  \"AllowedHosts\": \"*\", \
  \"Logging\": { \
    \"LogLevel\": { \
      \"Default\": \"Information\", \
      \"Microsoft.AspNetCore\": \"Warning\" \
    } \
  }, \
  \"Url\": { \
    \"ClientUrl\": \"${CLIENT_URL}\", \
    \"ServerUrl\": \"${SERVER_URL}\" \
  }, \
  \"Database\": { \
    \"ConnectionString\": \"Host=${POSTGRES_HOST};Port=${POSTGRES_PORT};Username=${POSTGRES_USER};Password=${POSTGRES_PASSWORD};Database=${POSTGRES_DB};\" \
  }, \
  \"SmtpSettings\": { \
    \"Host\": \"${SMTP_HOST}\", \
    \"Port\": ${SMTP_PORT}, \
    \"SenderMail\": \"${SENDER_MAIL}\", \
    \"SenderPassword\": \"${SENDER_PASSWORD}\", \
    \"RecipientMail\": \"${RECIPIENT_MAIL}\" \
  }, \
  \"JwtSettings\": { \
    \"Secret\": \"${JWT_SECRET}\" \
  } \
}' > appsettings.json

# === BUILD STAGE ===
FROM config AS build
WORKDIR /src

COPY . .

RUN dotnet restore
RUN dotnet build --no-restore

# === RUNTIME STAGE ===
FROM build AS runtime
WORKDIR /app

COPY --from=build /src .

EXPOSE 5039
ENTRYPOINT ["dotnet", "run", "--urls", "http://0.0.0.0:5039"]

