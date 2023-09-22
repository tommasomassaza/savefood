package com.ted.savefood.reviewservice.command.api.aggregate;

import com.ted.savefood.reviewservice.command.api.commands.CancelReviewCommand;
import com.ted.savefood.reviewservice.command.api.commands.CompleteReviewCommand;
import com.ted.savefood.reviewservice.command.api.commands.CreateReviewCommand;
import com.ted.savefood.reviewservice.command.api.events.ReviewCancelledEvent;
import com.ted.savefood.reviewservice.command.api.events.ReviewCompletedEvent;
import com.ted.savefood.reviewservice.command.api.events.ReviewCreatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class ReviewAggregate {
    @AggregateIdentifier
    private String reviewId;
    private String shopId;
    private String userId;
    private String userName;
    private String description;
    private int stars;

    public ReviewAggregate() {
    }

    @CommandHandler
    public ReviewAggregate(CreateReviewCommand createReviewCommand) {
        ReviewCreatedEvent reviewCreatedEvent = new ReviewCreatedEvent();
        BeanUtils.copyProperties(createReviewCommand, reviewCreatedEvent);

        AggregateLifecycle.apply(reviewCreatedEvent);
    }

    @EventSourcingHandler
    public void on(ReviewCreatedEvent reviewCreatedEvent) {
        this.reviewId = reviewCreatedEvent.getReviewId();
        this.shopId = reviewCreatedEvent.getShopId();
        this.userId = reviewCreatedEvent.getUserId();
        this.userName = reviewCreatedEvent.getUserName();
        this.description = reviewCreatedEvent.getDescription();
        this.stars = reviewCreatedEvent.getStars();
    }

    @CommandHandler
    public void handle(CompleteReviewCommand completeReviewCommand) {
        // Validate the command
        // Publish review completed event
        ReviewCompletedEvent reviewCompletedEvent
                = ReviewCompletedEvent.builder()
                .reviewId(completeReviewCommand.getReviewId())
                .build();
        AggregateLifecycle.apply(reviewCompletedEvent);
    }

    @CommandHandler
    public void handle(CancelReviewCommand cancelReviewCommand) {
        ReviewCancelledEvent reviewCancelledEvent
                = new ReviewCancelledEvent();
        BeanUtils.copyProperties(cancelReviewCommand, reviewCancelledEvent);

        AggregateLifecycle.apply(reviewCancelledEvent);
    }
}
