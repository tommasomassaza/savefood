package com.ted.savefood.shopservice.command.api.aggregate;

import com.ted.savefood.commonutils.commands.ModifyStarsShopCommand;
import com.ted.savefood.commonutils.events.ShopStarsModifiedEvent;
import com.ted.savefood.shopservice.command.api.commands.CancelShopCommand;
import com.ted.savefood.shopservice.command.api.commands.CreateShopCommand;
import com.ted.savefood.shopservice.command.api.events.ShopCancelledEvent;
import com.ted.savefood.shopservice.command.api.events.ShopCreatedEvent;
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
        ShopCancelledEvent shopCancelledEvent
                = new ShopCancelledEvent();
        BeanUtils.copyProperties(cancelShopCommand, shopCancelledEvent);

        AggregateLifecycle.apply(shopCancelledEvent);
    }

    @EventSourcingHandler
    public void on(ShopCancelledEvent shopCancelledEvent) {
        this.shopId = shopCancelledEvent.getShopId();
    }
}
