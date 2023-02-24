# Build modules
# With no arguments, build all modules
# To build one or more modules, pass them as arguments
# Example: ./build.sh api-gateway user-service

if [ $# -gt 0 ]; then
    for module in $@
    do
      cd $module
      ./mvnw -DskipTests=true clean install
      cd ..
    done
  else
    cd common-functionality
    ./mvnw -DskipTests=true clean install
    cd ../api-gateway
    ./mvnw -DskipTests=true clean install
    cd ../discovery-service
    ./mvnw -DskipTests=true clean install
    cd ../api-gateway
    ./mvnw -DskipTests=true clean install
    cd ../box-service
    ./mvnw -DskipTests=true clean install
    cd ../reservation-service
    ./mvnw -DskipTests=true clean install
    cd ../shop-service
    ./mvnw -DskipTests=true clean install
    cd ../user-service
    ./mvnw -DskipTests=true clean install
    cd ../payment-service
    ./mvnw -DskipTests=true clean install
    cd ../order-service
    ./mvnw -DskipTests=true clean install
    cd ..
fi