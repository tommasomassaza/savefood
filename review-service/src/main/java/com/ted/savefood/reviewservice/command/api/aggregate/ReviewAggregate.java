package com.ted.savefood.reviewservice.command.api.aggregate;

import com.ted.savefood.reviewservice.command.api.commands.CancelReviewCommand;
import com.ted.savefood.reviewservice.command.api.commands.CompleteReviewCommand;
import com.ted.savefood.reviewservice.command.api.commands.CreateReviewCommand;
import com.ted.savefood.reviewservice.command.api.events.ReviewCancelledEvent;
import com.ted.savefood.reviewservice.command.api.events.ReviewCompletedEvent;
import com.ted.savefood.reviewservice.command.api.events.ReviewCreatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateCreationPolicy;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.modelling.command.CreationPolicy;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

@Aggregate
public class ReviewAggregate {
    @AggregateIdentifier
    private String reviewId;

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
    @CreationPolicy(AggregateCreationPolicy.CREATE_IF_MISSING)
    public void handle(CancelReviewCommand cancelReviewCommand) {
        ReviewCancelledEvent reviewCancelledEvent
                = new ReviewCancelledEvent();
        BeanUtils.copyProperties(cancelReviewCommand, reviewCancelledEvent);

        AggregateLifecycle.apply(reviewCancelledEvent);
    }

    @EventSourcingHandler
    public void on(ReviewCancelledEvent reviewCancelledEvent) {
        this.reviewId = reviewCancelledEvent.getReviewId();
    }
}
