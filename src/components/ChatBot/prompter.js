const carbonData ={
    carbon_footprint: {
      daily_total_kg_co2: 12.5,
      yearly_total_kg_co2: 4500,
      categories: {
        transportation: {
          commute_mode: "Car",
          daily_commute_distance_km: 10,
          fuel_type: "Petrol",
          emission_kg_co2: 3.2
        },
        home_energy: {
          monthly_consumption_kwh: 350,
          energy_source: "Electricity",
          emission_kg_co2: 1.5
        },
        food_and_diet: {
          diet_type: "Omnivore",
          food_source_frequency: "Weekly",
          emission_kg_co2: 2.0
        },
        shopping_and_goods: {
          clothing_purchase_frequency: "Monthly",
          general_purchases_frequency: "Monthly",
          recycling_habits: "Good",
          emission_kg_co2: 0.8
        },
        waste_management: {
          waste_disposal_frequency: "Weekly",
          composting: "Yes",
          emission_kg_co2: 0.3
        },
        lifestyle_and_habits: {
          energy_saving: "Yes",
          water_usage: "Moderate",
          emission_kg_co2: 0.7
        }
      }
    },
    offset_activities: {
      tree_planting: 10,
      renewable_energy_usage: 30,
      community_clean_ups: 2,
      emission_offset_kg_co2: 5.0
    }
}

export const prompt = `
I am trying to reduce my carbon footprint. Here is my current carbon data:
- Total Daily Emissions: ${carbonData.carbon_footprint.daily_total_kg_co2} kg CO2
- Total Yearly Emissions: ${carbonData.carbon_footprint.yearly_total_kg_co2} kg CO2

**Transportation**:
- Commute Mode: ${carbonData.carbon_footprint.categories.transportation.commute_mode}
- Daily Commute Distance: ${carbonData.carbon_footprint.categories.transportation.daily_commute_distance_km} km
- Fuel Type: ${carbonData.carbon_footprint.categories.transportation.fuel_type}
- Emission: ${carbonData.carbon_footprint.categories.transportation.emission_kg_co2} kg CO2

**Home Energy**:
- Monthly Consumption: ${carbonData.carbon_footprint.categories.home_energy.monthly_consumption_kwh} kWh
- Energy Source: ${carbonData.carbon_footprint.categories.home_energy.energy_source}
- Emission: ${carbonData.carbon_footprint.categories.home_energy.emission_kg_co2} kg CO2

**Food and Diet**:
- Diet Type: ${carbonData.carbon_footprint.categories.food_and_diet.diet_type}
- Food Source Frequency: ${carbonData.carbon_footprint.categories.food_and_diet.food_source_frequency}
- Emission: ${carbonData.carbon_footprint.categories.food_and_diet.emission_kg_co2} kg CO2

**Shopping and Goods**:
- Clothing Purchase Frequency: ${carbonData.carbon_footprint.categories.shopping_and_goods.clothing_purchase_frequency}
- General Purchases Frequency: ${carbonData.carbon_footprint.categories.shopping_and_goods.general_purchases_frequency}
- Recycling Habits: ${carbonData.carbon_footprint.categories.shopping_and_goods.recycling_habits}
- Emission: ${carbonData.carbon_footprint.categories.shopping_and_goods.emission_kg_co2} kg CO2

**Waste Management**:
- Waste Disposal Frequency: ${carbonData.carbon_footprint.categories.waste_management.waste_disposal_frequency}
- Composting: ${carbonData.carbon_footprint.categories.waste_management.composting}
- Emission: ${carbonData.carbon_footprint.categories.waste_management.emission_kg_co2} kg CO2

**Lifestyle and Habits**:
- Energy Saving: ${carbonData.carbon_footprint.categories.lifestyle_and_habits.energy_saving}
- Water Usage: ${carbonData.carbon_footprint.categories.lifestyle_and_habits.water_usage}
- Emission: ${carbonData.carbon_footprint.categories.lifestyle_and_habits.emission_kg_co2} kg CO2

Additionally, I am offsetting some of my emissions through:
- Tree Planting: ${carbonData.offset_activities.tree_planting} trees
- Renewable Energy Usage: ${carbonData.offset_activities.renewable_energy_usage} %
- Community Cleanups: ${carbonData.offset_activities.community_clean_ups} events
- Total Offset Emissions: ${carbonData.offset_activities.emission_offset_kg_co2} kg CO2

Can you suggest personalized ways for me to further reduce my carbon footprint? 
Make the response short it shouldnt be longer than 200 words
`;