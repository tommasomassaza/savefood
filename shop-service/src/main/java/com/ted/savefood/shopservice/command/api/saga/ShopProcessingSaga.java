package com.ted.savefood.shopservice.command.api.saga;

import com.ted.savefood.commonutils.events.BoxesCancelledByShopIdEvent;
import com.ted.savefood.shopservice.command.api.commands.AnnulCancelShopCommand;
import com.ted.savefood.shopservice.command.api.commands.CancelBoxesByShopIdCommand;
import com.ted.savefood.shopservice.command.api.commands.CompleteCancelShopCommand;
import com.ted.savefood.shopservice.command.api.events.ShopCancelAnnulEvent;
import com.ted.savefood.shopservice.command.api.events.ShopCancelCompleteEvent;
import com.ted.savefood.shopservice.command.api.events.ShopCancelEvent;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.modelling.saga.EndSaga;
import org.axonframework.modelling.saga.SagaEventHandler;
import org.axonframework.modelling.saga.StartSaga;
import org.axonframework.spring.stereotype.Saga;
import org.springframework.beans.factory.annotation.Autowired;

@Saga
@Slf4j
public class ShopProcessingSaga {

    @Autowired
    private transient CommandGateway commandGateway;

    public ShopProcessingSaga() {
    }

    @StartSaga
    @SagaEventHandler(associationProperty = "shopId")
    private void handle(ShopCancelEvent shopCancelEvent) {
        log.info("ShopCancelEvent in Saga for Shop Id : {}", shopCancelEvent.getShopId());

        try {
            CancelBoxesByShopIdCommand cancelBoxesByShopIdCommand =
                    CancelBoxesByShopIdCommand.builder()
                            .shopId(shopCancelEvent.getShopId())
                            .build();
            commandGateway.send(cancelBoxesByShopIdCommand);

        } catch (Exception e) {
            log.error(e.getMessage());

            // Start the compensating transaction
            annulCancelShopCommand(shopCancelEvent.getShopId());
        }
    }

    private void annulCancelShopCommand(String shopId) {
        AnnulCancelShopCommand annulCancelShopCommand = new AnnulCancelShopCommand(shopId);
        commandGateway.send(annulCancelShopCommand);
    }

    @SagaEventHandler(associationProperty = "shopId")
    public void handle(BoxesCancelledByShopIdEvent boxesCancelledByShopIdEvent) {
        log.info("BoxesCancelledByShopIdEvent in Saga for Shop Id : {}", boxesCancelledByShopIdEvent.getShopId());

        CompleteCancelShopCommand completeCancelShopCommand
                = CompleteCancelShopCommand.builder()
                .shopId(boxesCancelledByShopIdEvent.getShopId())
                .build();

        commandGateway.sendAndWait(completeCancelShopCommand);
    }

    @SagaEventHandler(associationProperty = "shopId")
    @EndSaga
    public void handle(ShopCancelCompleteEvent shopCancelCompleteEvent) {
        log.info("ShopCancelCompleteEvent in Saga for Shop Id : {}", shopCancelCompleteEvent.getShopId());
    }

    @SagaEventHandler(associationProperty = "shopId")
    @EndSaga
    public void handle(ShopCancelAnnulEvent shopCancelAnnulEvent) {
        log.info("ShopCancelAnnulEvent in Saga for Shop Id : {}", shopCancelAnnulEvent.getShopId());
    }
}
