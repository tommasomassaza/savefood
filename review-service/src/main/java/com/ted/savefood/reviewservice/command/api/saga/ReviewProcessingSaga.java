package com.ted.savefood.reviewservice.command.api.saga;

import com.ted.savefood.commonutils.commands.ModifyStarsShopCommand;
import com.ted.savefood.commonutils.events.ShopStarsModifiedEvent;
import com.ted.savefood.reviewservice.command.api.commands.CancelReviewCommand;
import com.ted.savefood.reviewservice.command.api.commands.CompleteReviewCommand;
import com.ted.savefood.reviewservice.command.api.events.ReviewCancelledEvent;
import com.ted.savefood.reviewservice.command.api.events.ReviewCompletedEvent;
import com.ted.savefood.reviewservice.command.api.events.ReviewCreatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.modelling.saga.EndSaga;
import org.axonframework.modelling.saga.SagaEventHandler;
import org.axonframework.modelling.saga.StartSaga;
import org.axonframework.spring.stereotype.Saga;
import org.springframework.beans.factory.annotation.Autowired;

@Saga
@Slf4j
public class ReviewProcessingSaga {

    @Autowired
    private transient CommandGateway commandGateway;

    public ReviewProcessingSaga() {
    }

    @StartSaga
    @SagaEventHandler(associationProperty = "reviewId")
    private void handle(ReviewCreatedEvent reviewCreatedEvent) {
        log.info("ReviewCreatedEvent in Saga for Review Id : {}", reviewCreatedEvent.getReviewId());

        try {
            ModifyStarsShopCommand modifyStarsShopCommand =
                    ModifyStarsShopCommand.builder()
                            .shopId(reviewCreatedEvent.getShopId())
                            .reviewId(reviewCreatedEvent.getReviewId())
                            .stars(reviewCreatedEvent.getStars())
                            .build();
            commandGateway.send(modifyStarsShopCommand);

        } catch (Exception e) {
            log.error(e.getMessage());

            // Start the compensating transaction
            cancelReviewCommand(reviewCreatedEvent.getReviewId());
        }
    }

    private void cancelReviewCommand(String reviewId) {
        CancelReviewCommand cancelReviewCommand = new CancelReviewCommand(reviewId);
        commandGateway.send(cancelReviewCommand);
    }

    @SagaEventHandler(associationProperty = "reviewId")
    public void handle(ShopStarsModifiedEvent shopStarsModifiedEvent) {
        log.info("ShopStarsModifiedEvent in Saga for Shop Id : {}", shopStarsModifiedEvent.getShopId());

        try {
            CompleteReviewCommand completeReviewCommand
                    = CompleteReviewCommand.builder()
                    .reviewId(shopStarsModifiedEvent.getReviewId())
                    .build();

            commandGateway.sendAndWait(completeReviewCommand);
        } catch (Exception e) {
            log.error(e.getMessage());

            // Start the compensating transaction
            cancelReviewCommand(shopStarsModifiedEvent.getReviewId());
        }
    }

    @SagaEventHandler(associationProperty = "reviewId")
    @EndSaga
    public void handle(ReviewCompletedEvent reviewCompletedEvent) {
        log.info("ReviewCompletedEvent in Saga for Review Id : {}", reviewCompletedEvent.getReviewId());
    }

    @SagaEventHandler(associationProperty = "reviewId")
    @EndSaga
    public void handle(ReviewCancelledEvent reviewCancelledEvent) {
        log.info("ReviewCancelledEvent in Saga for Review Id : {}", reviewCancelledEvent.getReviewId());
    }
}
