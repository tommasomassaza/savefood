package com.ted.savefood.reviewservice.command.api.controller;

import com.ted.savefood.reviewservice.command.api.commands.CancelReviewCommand;
import com.ted.savefood.reviewservice.command.api.commands.CreateReviewCommand;
import com.ted.savefood.reviewservice.common.modelDto.ReviewDto;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
public class ReviewCommandController {
    private final CommandGateway commandGateway;

    public ReviewCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String addReview(@RequestBody ReviewDto reviewDto) {
        String reviewId = UUID.randomUUID().toString();
        CreateReviewCommand createReviewCommand = new CreateReviewCommand();
        BeanUtils.copyProperties(reviewDto, createReviewCommand);

        createReviewCommand.setReviewId(reviewId);

        String result = commandGateway.sendAndWait(createReviewCommand);
        return result;
    }

    @DeleteMapping("{reviewId}")
    public String deleteBox(@PathVariable String reviewId) {
        CancelReviewCommand cancelReviewCommand = new CancelReviewCommand(reviewId);

        String result = commandGateway.sendAndWait(cancelReviewCommand);
        return result;
    }
}
