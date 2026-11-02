package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Continent;

@Repository
public interface ContinentRepository extends JpaRepository<Continent, Integer> {

}
