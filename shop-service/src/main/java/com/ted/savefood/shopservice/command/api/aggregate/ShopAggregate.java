package com.ted.savefood.shopservice.command.api.aggregate;

import com.ted.savefood.commonutils.commands.ModifyStarsShopCommand;
import com.ted.savefood.commonutils.events.BoxesCancelledByShopIdEvent;
import com.ted.savefood.commonutils.events.ShopStarsModifiedEvent;
import com.ted.savefood.shopservice.command.api.commands.*;
import com.ted.savefood.shopservice.command.api.events.ShopCancelCompleteEvent;
import com.ted.savefood.shopservice.command.api.events.ShopCancelEvent;
import com.ted.savefood.shopservice.command.api.events.ShopCreatedEvent;
import com.ted.savefood.shopservice.command.api.events.ShopModifiedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateCreationPolicy;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.modelling.command.CreationPolicy;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class ShopAggregate {
    @AggregateIdentifier
    private String shopId;

    public ShopAggregate() {
    }

    @CommandHandler
    public ShopAggregate(CreateShopCommand createShopCommand) {
        ShopCreatedEvent shopCreatedEvent = new ShopCreatedEvent();
        BeanUtils.copyProperties(createShopCommand, shopCreatedEvent);

        AggregateLifecycle.apply(shopCreatedEvent);
    }

    @EventSourcingHandler
    public void on(ShopCreatedEvent shopCreatedEvent) {
        this.shopId = shopCreatedEvent.getShopId();
    }

    @CommandHandler
    @CreationPolicy(AggregateCreationPolicy.CREATE_IF_MISSING)
    public void handle(ModifyStarsShopCommand modifyStarsShopCommand) {
        ShopStarsModifiedEvent shopStarsModifiedEvent = new ShopStarsModifiedEvent();
        BeanUtils.copyProperties(modifyStarsShopCommand, shopStarsModifiedEvent);

        AggregateLifecycle.apply(shopStarsModifiedEvent);
    }

    @EventSourcingHandler
    public void on(ShopStarsModifiedEvent shopStarsModifiedEvent) {
        this.shopId = shopStarsModifiedEvent.getShopId();
    }

    @CommandHandler
    @CreationPolicy(AggregateCreationPolicy.CREATE_IF_MISSING)
    public void handle(CancelShopCommand cancelShopCommand) {
        ShopCancelEvent shopCancelEvent
                = new ShopCancelEvent();
        BeanUtils.copyProperties(cancelShopCommand, shopCancelEvent);

        AggregateLifecycle.apply(shopCancelEvent);
    }

    @EventSourcingHandler
    public void on(ShopCancelEvent shopCancelEvent) {
        this.shopId = shopCancelEvent.getShopId();
    }

    @CommandHandler
    @CreationPolicy(AggregateCreationPolicy.CREATE_IF_MISSING)
    public void handle(ModifyShopCommand modifyShopCommand) {
        ShopModifiedEvent shopModifiedEvent
                = new ShopModifiedEvent();
        BeanUtils.copyProperties(modifyShopCommand, shopModifiedEvent);

        AggregateLifecycle.apply(shopModifiedEvent);
    }

    @EventSourcingHandler
    public void on(ShopModifiedEvent shopModifiedEvent) {
        this.shopId = shopModifiedEvent.getShopId();
    }

    @CommandHandler
    public void handle(CompleteCancelShopCommand completeCancelShopCommand) {
        // Validate the command
        ShopCancelCompleteEvent shopCancelCompleteEvent
                = ShopCancelCompleteEvent.builder()
                .shopId(completeCancelShopCommand.getShopId())
                .build();
        AggregateLifecycle.apply(shopCancelCompleteEvent);
    }

    @CommandHandler
    public void handle(CancelBoxesByShopIdCommand cancelBoxesByShopIdCommand) {
        BoxesCancelledByShopIdEvent boxesCancelledByShopIdEvent = new BoxesCancelledByShopIdEvent();
        BeanUtils.copyProperties(cancelBoxesByShopIdCommand, boxesCancelledByShopIdEvent);

        AggregateLifecycle.apply(boxesCancelledByShopIdEvent);
    }
}
