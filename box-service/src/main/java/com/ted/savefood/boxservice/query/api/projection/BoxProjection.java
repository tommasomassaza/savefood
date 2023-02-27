package com.ted.savefood.boxservice.query.api.projection;

import com.ted.savefood.boxservice.common.model.Box;
import com.ted.savefood.boxservice.common.modelDto.BoxDto;
import com.ted.savefood.boxservice.common.repository.BoxRepository;
import com.ted.savefood.boxservice.query.api.queries.GetBoxesQuery;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BoxProjection {
    private BoxRepository boxRepository;

    public BoxProjection(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    @QueryHandler
    public List<BoxDto> handle(GetBoxesQuery getBoxesQuery){
        List<Box> boxes = new LinkedList<>();
        boxRepository.findAll().forEach(boxes::add);

        return boxes.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private BoxDto toDto(Box box){
        BoxDto boxDto = new BoxDto();
        BeanUtils.copyProperties(box,boxDto);

        return boxDto;
    }
}
