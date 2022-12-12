cd api-gateway
./mvnw -DskipTests=true clean install
cd ../discovery-service
./mvnw -DskipTests=true clean install
cd ../box-service
./mvnw -DskipTests=true clean install
cd ../reservation-service
./mvnw -DskipTests=true clean install
cd ../review-service
./mvnw -DskipTests=true clean install
cd ../shop-service
./mvnw -DskipTests=true clean install
cd ../user-service
./mvnw -DskipTests=true clean install
cd ..