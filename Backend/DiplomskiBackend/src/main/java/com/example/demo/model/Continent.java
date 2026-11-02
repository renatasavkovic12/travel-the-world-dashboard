package com.example.demo.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "continent")
public class Continent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "name_bs")
	private String nameBs;

	@Column(name = "name_en")
	private String nameEn;

	@Column(name = "description_bs")
	private String descriptionBs;

	@Column(name = "description_en")
	private String descriptionEn;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "count")
	private int count;

	@OneToMany(mappedBy = "continent", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Destination> destinations;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNameBs() {
		return nameBs;
	}

	public void setNameBs(String nameBs) {
		this.nameBs = nameBs;
	}

	public String getNameEn() {
		return nameEn;
	}

	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}

	public String getDescriptionBs() {
		return descriptionBs;
	}

	public void setDescriptionBs(String descriptionBs) {
		this.descriptionBs = descriptionBs;
	}

	public String getDescriptionEn() {
		return descriptionEn;
	}

	public void setDescriptionEn(String descriptionEn) {
		this.descriptionEn = descriptionEn;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
