FROM openjdk:21
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 5454
ENTRYPOINT ["java", "-jar", "app.jar"]
