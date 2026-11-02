package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.DestinationImage;

@Repository
public interface DestinationImageRepository extends JpaRepository<DestinationImage, Integer>{

}
