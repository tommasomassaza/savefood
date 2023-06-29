
if [ $# -gt 0 ]; then
    for image in $@
    do
      docker tag savefood-"$image"-service:latest tommimassa98/savefood-"$image"-service:latest
      docker push tommimassa98/savefood-"$image"-service:latest
    done
  else
    docker tag savefood-shop-service:latest tommimassa98/savefood-shop-service:latest
    docker push tommimassa98/savefood-shop-service:latest

    docker tag savefood-api-gateway:latest tommimassa98/savefood-api-gateway:latest
    docker push tommimassa98/savefood-api-gateway:latest

    docker tag savefood-reservation-service:latest tommimassa98/savefood-reservation-service:latest
    docker push tommimassa98/savefood-reservation-service:latest

    docker tag savefood-box-service:latest tommimassa98/savefood-box-service:latest
    docker push tommimassa98/savefood-box-service:latest

    docker tag savefood-order-service:latest tommimassa98/savefood-order-service:latest
    docker push tommimassa98/savefood-order-service:latest

    docker tag savefood-discovery-server:latest tommimassa98/savefood-discovery-server:latest
    docker push tommimassa98/savefood-discovery-server:latest

    docker tag savefood-payment-service:latest tommimassa98/savefood-payment-service:latest
    docker push tommimassa98/savefood-payment-service:latest
fi
