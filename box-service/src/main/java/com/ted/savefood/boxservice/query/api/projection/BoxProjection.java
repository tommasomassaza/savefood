package com.ted.savefood.boxservice.query.api.projection;

import com.ted.savefood.boxservice.common.model.Box;
import com.ted.savefood.boxservice.common.modelDto.BoxDto;
import com.ted.savefood.boxservice.common.repository.BoxRepository;
import com.ted.savefood.boxservice.query.api.queries.GetBoxQuery;
import com.ted.savefood.boxservice.query.api.queries.GetBoxesByShopQuery;
import com.ted.savefood.boxservice.query.api.queries.GetBoxesQuery;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class BoxProjection {
    private final BoxRepository boxRepository;

    public BoxProjection(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    @QueryHandler
    public List<BoxDto> handle(GetBoxesQuery getBoxesQuery){
        List<Box> boxes = new LinkedList<>();
        boxRepository.findAllByCity(getBoxesQuery.getCity()).forEach(boxes::add);

        return boxes.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @QueryHandler
    public List<BoxDto> handle(GetBoxesByShopQuery getBoxesByShopQuery) {
        List<Box> shops = new LinkedList<>();
        boxRepository.findAllByShopId(getBoxesByShopQuery.getShopId()).forEach(shops::add);

        return shops.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @QueryHandler
    public BoxDto handle(GetBoxQuery getBoxQuery) {
        Optional<Box> boxOptional = boxRepository.findById(getBoxQuery.getBoxId());

        if (boxOptional.isPresent()) {
            Box box = boxOptional.get();
            return toDto(box);
        } else {
            return null;
        }
    }

    private BoxDto toDto(Box box){
        BoxDto boxDto = new BoxDto();
        BeanUtils.copyProperties(box,boxDto);

        return boxDto;
    }
}
