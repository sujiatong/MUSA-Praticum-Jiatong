

# Utility data modeling

## Table of Contents

<details>

   <summary>Contents</summary>

1. [Data source](#data-source)
1. [Objective](#objective)
   1. [#1 Aggregate data from zip code to county level](#1-aggregate-data-from-zip-code-to-county-level)
   1. [Aggregating (ZIP-to-county aggregation)](#aggregating-zip-to-county-aggregation)
   1. [#2 Vadilating](#2-vadilating)
1. [Review all Workfold for each state](#review-all-workfold-for-each-state)
1. [Refrence](#refrence)

</details>


## Data source
- [Utility disconnection data](https://github.com/sujiatong/MUSA-Praticum-Jiatong/tree/d68658d60ef7d0ed9b9b2154280c585d7780c8aa/Zip%20Code%20Data/State-Specific%20Data) within each state (zip level)
-  ZIP Code Crosswalk data from [HUD](https://www.huduser.gov/portal/dataset/uspszip-api.html)
-  [Census data](https://www.census.gov/geographies/reference-files/time-series/geo/county-adjacency.html) for county information
  

## Objective
- Aggregating utility disconnection data each state to the county level

- Analysing the process and feasibility and accuracy of the process
  - comparing total_disconnections and est_disconnections
  - Evaluation Metrics

### #1 Aggregate data from zip code to county level
  - Merging census and HUD crosswalk data to get the county name
  - Remove the duplicating zip code that determines the county base on the largest ratio.
  - Merging utility data with zip code data
  - Aggregate data from zip code to county level
  
### Aggregating (ZIP-to-county aggregation)

ZIP-to-county aggregation summarizes utility disconnection data at the **county level** in Washington State by grouping the dataset `merged_utility` based on `NAME` (county), `year`, `month`, and `utility_name`.
The resulting summary table `county_agg` includes:

-   **`total_disconnections`**: The total number of reported utility disconnections in each group.

-   **`est_disconnections`**: The estimated number of disconnections, adjusted using a weighting factor (`data.results.tot_ratio`), which accounts for partial ZIP-to-county mappings.

-   **`avg_disconnection_rate`**: The average disconnection count per record in each zip code

-   **`difference`**: The numerical difference between the **`total_disconnections`** and **`est_disconnections`** totals, which can help assess the impact of the weighting method.

- **`PCT_DIF`**: the precentage of **`difference`**
- **`mae`** (Mean Absolute Error): mean of absolute differences between total_disconnections and est_disconnections

- **`mape`**(Mean Absolute Percentage Error):
the percentage equivalent of mean absolute error (MAE), measuring the accuracy between total_disconnections and est_disconnections


You can explore each ``county_agg`` summary table through the interactive 
[Dashborad](https://sujiatong.github.io/MUSA-Praticum-Jiatong/dashboard/index.html)

--- 
### #2 Vadilating
  - comparing total_disconnections and est_disconnections
  - Evaluation Metrics: Utilizing **Mean Absolute Error** & **Mean Percentage Error** to determine the feassibility of dataset


## Review all Workfold for each state
- [Maryland](https://sujiatong.github.io/MUSA-Praticum-Jiatong/State_agg_Rmd/maryland_new.html)
- [California](https://sujiatong.github.io/MUSA-Praticum-Jiatong/State_agg_Rmd/California.html)
- [Oregon](https://sujiatong.github.io/MUSA-Praticum-Jiatong/State_agg_Rmd/oregon.html)
- [Washington](https://sujiatong.github.io/MUSA-Praticum-Jiatong/State_agg_Rmd/WA.html)
  

Hint: All ``county_agg`` summary tables have already been exported as ``.csv `` and ``.json`` files. 

- The ``.json`` files can be found in the [dashboard/data](https://github.com/sujiatong/MUSA-Praticum-Jiatong/tree/main/dashboard/data) folder.

- All related materials and datasets — including R Markdown (.Rmd) files and ``.csv ``files — are available in the [State_agg_Rmd](https://github.com/sujiatong/MUSA-Praticum-Jiatong/tree/main/State_agg_Rmd) folder of the repository.




## Refrence
Carley, S., Mildenberger, M., Konisky, D. M., & Stokes, L. C. (2023). Utility disconnection protections and the incidence of energy insecurity in the United States. Energy Research & Social Science, 100, 103051. https://doi.org/10.1016/j.erss.2023.103051

Energy Justice Lab. Utility Disconnections Dashboard. Retrieved May 7, 2025, from https://utilitydisconnections.org/index.html

Din, A., & Wilson, R. (2020). Crosswalking ZIP Codes to Census Geographies: Geoprocessing the U.S. Department of Housing & Urban Development’s ZIP Code Crosswalk Files.  Cityscape: A Journal of Policy Development and Research, 22(1), 293–298. U.S. Department of Housing and Urban Development.  https://www.huduser.gov/portal/periodicals/cityscpe/vol22num1/ch12.pdf​

Wilson, R., & Din, A. (2018). Understanding and enhancing the U.S. Department of Housing and Urban Development’s ZIP Code Crosswalk Files.  Cityscape: A Journal of Policy Development and Research, 20(2), 277–294.  https://www.huduser.gov/portal/periodicals/cityscpe/vol20num2/ch16.pdf​

Din, A. (2021). New Data Fields for HUD Aggregated USPS Administrative Data on Address Vacancies. Cityscape, 23(3), 283–294. https://www.jstor.org/stable/48636236

Ellis, D. P. (2008). Using the R-MAPE index as a resistant measure of forecast accuracy. Journal of Applied Business Research, 24(2), 1–10. https://doi.org/10.19030/jabr.v24i2.1369

Vexpower. (n.d.). Mean Absolute Percentage Error (MAPE). Vexpower. Retrieved May 7, 2025, from https://www.vexpower.com/brief/mean-absolute-percentage-error