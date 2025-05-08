

# Utility data modeling

Dashborad: https://sujiatong.github.io/MUSA-Praticum-Jiatong/dashboard/index.html

## Data source
- [Utility disconnection data](https://github.com/sujiatong/MUSA-Praticum-Jiatong/tree/d68658d60ef7d0ed9b9b2154280c585d7780c8aa/Zip%20Code%20Data/State-Specific%20Data) within each state (zip level)
-  ZIP Code Crosswalk data from [HUD](https://www.huduser.gov/portal/dataset/uspszip-api.html)
-  [Census data](https://www.census.gov/geographies/reference-files/time-series/geo/county-adjacency.html) for county information
  

## Objective
- Aggregating utility disconnection data each state to the county level
- Analysing the process and feasibility and accuracy of the process



## Aggregating (ZIP-to-county aggregation)

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
## Refrence
Carley, S., Mildenberger, M., Konisky, D. M., & Stokes, L. C. (2023). Utility disconnection protections and the incidence of energy insecurity in the United States. Energy Research & Social Science, 100, 103051. https://doi.org/10.1016/j.erss.2023.103051

Energy Justice Lab. Utility Disconnections Dashboard. Retrieved May 7, 2025, from https://utilitydisconnections.org/index.html

Din, A., & Wilson, R. (2020). Crosswalking ZIP Codes to Census Geographies: Geoprocessing the U.S. Department of Housing & Urban Development’s ZIP Code Crosswalk Files.  Cityscape: A Journal of Policy Development and Research, 22(1), 293–298. U.S. Department of Housing and Urban Development.  https://www.huduser.gov/portal/periodicals/cityscpe/vol22num1/ch12.pdf​

Wilson, R., & Din, A. (2018). Understanding and enhancing the U.S. Department of Housing and Urban Development’s ZIP Code Crosswalk Files.  Cityscape: A Journal of Policy Development and Research, 20(2), 277–294.  https://www.huduser.gov/portal/periodicals/cityscpe/vol20num2/ch16.pdf​

Din, A. (2021). New Data Fields for HUD Aggregated USPS Administrative Data on Address Vacancies. Cityscape, 23(3), 283–294. https://www.jstor.org/stable/48636236

Ellis, D. P. (2008). Using the R-MAPE index as a resistant measure of forecast accuracy. Journal of Applied Business Research, 24(2), 1–10. https://doi.org/10.19030/jabr.v24i2.1369

Vexpower. (n.d.). Mean Absolute Percentage Error (MAPE). Vexpower. Retrieved May 7, 2025, from https://www.vexpower.com/brief/mean-absolute-percentage-error