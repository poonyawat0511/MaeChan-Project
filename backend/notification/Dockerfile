# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk-slim
# openjdk:21-jdk-slim (Open-source and widely used)
# eclipse-temurin:21-jdk (from eclip)
# oracle-jdk:21 (from oracle not free)

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the project files to the container
COPY . .

# Expose port 8081 to the outside world
EXPOSE 8081

# Run the Spring Boot application
CMD ["mvn", "spring-boot:run"]