package com.ted.savefood.boxservice.command.api.aggregate;

import com.ted.savefood.commonutils.commands.CancelBoxesByShopIdCommand;
import com.ted.savefood.commonutils.events.BoxesCancelledByShopIdEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class BoxesByShopAggregate {
    @AggregateIdentifier
    private String shopId;

    public BoxesByShopAggregate() {
    }

    @CommandHandler
    public BoxesByShopAggregate(CancelBoxesByShopIdCommand cancelBoxesByShopIdCommand) {
        BoxesCancelledByShopIdEvent boxesCancelledByShopIdEvent = new BoxesCancelledByShopIdEvent();
        BeanUtils.copyProperties(cancelBoxesByShopIdCommand, boxesCancelledByShopIdEvent);

        AggregateLifecycle.apply(boxesCancelledByShopIdEvent);
    }

    @EventSourcingHandler
    public void on(BoxesCancelledByShopIdEvent boxesCancelledByShopIdEvent) {
        this.shopId = boxesCancelledByShopIdEvent.getShopId();
    }
}
