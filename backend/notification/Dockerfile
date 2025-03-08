# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project files to the container
COPY . .

# Ensure the Maven Wrapper is executable
RUN chmod +x ./mvnw

# Expose port 8081 to the outside world
EXPOSE 8081

# Run the Spring Boot application
CMD ["./mvnw", "spring-boot:run"]