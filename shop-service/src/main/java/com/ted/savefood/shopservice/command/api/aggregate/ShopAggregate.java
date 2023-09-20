package com.ted.savefood.shopservice.command.api.aggregate;

import com.ted.savefood.shopservice.command.api.commands.CancelShopCommand;
import com.ted.savefood.shopservice.command.api.commands.CreateShopCommand;
import com.ted.savefood.shopservice.command.api.events.ShopCancelledEvent;
import com.ted.savefood.shopservice.command.api.events.ShopCreatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class ShopAggregate {
    @AggregateIdentifier
    private String shopId;
    private String sellerId;
    private String name;
    private String city;
    private String address;
    private String description;
    private int telephoneNumber;
    private int numberOfReviews;
    private float stars;
    private String image;


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
        this.sellerId = shopCreatedEvent.getSellerId();
        this.name = shopCreatedEvent.getName();
        this.city = shopCreatedEvent.getCity();
        this.description = shopCreatedEvent.getDescription();
        this.address = shopCreatedEvent.getAddress();
        this.telephoneNumber = shopCreatedEvent.getTelephoneNumber();
        this.numberOfReviews = shopCreatedEvent.getNumberOfReviews();
        this.stars = shopCreatedEvent.getStars();
        this.image = shopCreatedEvent.getImage();
    }

    @CommandHandler
    public void handle(CancelShopCommand cancelShopCommand) {
        ShopCancelledEvent shopCancelledEvent
                = new ShopCancelledEvent();
        BeanUtils.copyProperties(cancelShopCommand, shopCancelledEvent);

        AggregateLifecycle.apply(shopCancelledEvent);
    }
}
