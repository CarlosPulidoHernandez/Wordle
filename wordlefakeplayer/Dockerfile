# syntax=docker/dockerfile:1
FROM openjdk:12
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw ./
COPY ./pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
CMD ["./mvnw", "spring-boot:run"]