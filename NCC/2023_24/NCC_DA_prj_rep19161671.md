# A Profitability Forecasting Model, a report.
by Silvestre Montalvo López
NCC@19161671

# Table of Contents

    -   [Preamble or where I finish and started to make the report.](#org133bd6a)
-   [Introduction](#org56703d0)
    -   [PREAMBLE](#org61c7895)
-   [The scope of the project (including key performance indicators)](#orgdaff416)
    -   [The Scope of the Project: Exploring the Relationship between Economic Indicators and Profitability](#orgbfb95b5)
    -   [Key Performance Indicators (KPIs)](#orgdffd7f0)
    -   [Model Performance](#orge14fda7)
    -   [Feature Importance](#org1b48129)
    -   [Limitations and Future Work](#org2573986)
-   [Project outcomes and how the outcomes were achieved](#org37f6920)
-   [A project plan](#orge108898)
    -   [A Draft](#org81976a5)
    -   [Step (preliminary) 1: Data Pre-processing and Exploration](#org691c41d)
    -   [Step (preliminary) 2: Feature Engineering and Selection](#org0c09d72)
    -   [Step (preliminary) 3: Model Evaluation and Hyperparameter Tuning](#orga78082a)
    -   [Step (preliminary) 4: Forecasting Profitability](#org3c24a01)
-   [Step 1 define the Target Variable](#org04e078a)
-   [Select Relevant Values.](#org945a034)
    -   [Core DataFrame](#org9b75a74)
    -   [The Core Data-Frame for model testing](#org6651bc8)
    -   [Calculating the Income Growth Rate](#org2fe4283)
    -   [Indicators 5,6,17](#orgb7db79c)
    -   [Demographic Indicators, 0 and 1.](#org77b8f93)
    -   [Merging DataFrame into a base model for forecasting](#orgf346209)
    -   [The Income Growth 2023 Rank to improve visualisation.](#org1ee0343)
    -   [Visualisation grouped by the last year IGR ranking](#org7979048)
-   [Create a Simple Linear Regression Model](#orgade3bfc)
    -   [RECAP](#org4476557)
    -   [Regarding including time when splitting train and test df for documenting purposes ✓](#org589e242)
-   [Evaluate and Refine the model.](#org77658b8)
    -   [The LR application.](#orgea47606)
    -   [Hypothesis Forecasting Model First Version](#org0a5589f)
    -   [First Evaluation draft](#orgee31015)
    -   [Second Evaluation: Redefine the Profitability Variable](#orgc3122bf)
    -   [Forecast Profitability.](#org502344d)
-   [Consideration of legislation, regulation, industry and organisational policies, procedures and requirements](#org4b2ed5d)
-   [Analysis](#orgd8559a4)
    -   [Modelling, a first version](#org193da38)
    -   [Feature Engineering](#orgd3c75db)
    -   [After applying Sensitivity Analysis](#org4138c60)
    -   [A simplified Model](#org15727c7)
-   [Insights](#orgb230e15)
-   [Recommendations and conclusions](#org07dbda6)



<a id="org133bd6a"></a>

## Preamble or where I finish and started to make the report.

 <img src="quote.png" alt="" style="float:left; width:auto; max-width:15%; height:auto;">
<style>

blockquote {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #FFF8DC;
    border-left: 2px solid #ffeb8e;
    border-left-color: rgb(255, 228, 102);
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
}
</style>

> Context: Here is where I start to feel lost. Probably the model is too simple —I said (I was just doing an exercise to understand these concepts). I had a data set on the HIC countries over the last 25 years with the indicators detailed above and wanted to assess profitability (to e.g. forecast and decide for new investments, expansion, etc.). So, with that purpose, I estimated a new indicator `IGR (Income Growth Rate)` on the `GDP per capita` and in a trying of Feature Engineering I did for estimating `population-growth-rate` (on `'SP.POP.AG18.FE.IN'` and `'SP.POP.AG18.MA.IN'`) and `'average-years-schooling'` (on the `'SE.ADT.LITR.ZS'`) and assaying an LR modelling to see whether or not I could build a forecasting profitability playing artefact on all that.


<a id="org56703d0"></a>

# Introduction


<a id="org61c7895"></a>

## PREAMBLE

>On summarising the project’s journey and the key insights gained, model's limitations and the broader learning experience. A reflective analysis providing both technical depth and insight into the process of building and evaluating models.


### Dear Stakeholders,

Teacher, colleagues, evaluator. 

In this report, I explore the process of developing a predictive model to assess **profitability** that could help a given particular kind of business to decide where to expand their presence, using a dataset spanning 25 years. My initial goal was to create a tool capable of forecasting profitability for potential investments by leveraging various socioeconomic indicators. These indicators included key metrics such as **GDP per capita growth**, ****population growth rate****, and **educational semblance**, all of which were derived through feature engineering from a group of seven in the last stages but initially reduced from a set of 18 world bank series.

However as I delved deeper into the analysis, it became clear that the simplicity of a ****linear regression model****, while useful for learning basic concepts, proved inadequate for capturing the complexity inherent in economic systems. The results, after an initial correction to a first version of the model, which was based on an `indicator proxy` that I called the `income growth rate`, which was based on the average standard of living within a country (the GDP per capita) and whose metrics did not provide useful.  Standard metrics such as <mark>`MSE (Mean Squared Error): 76.96`</mark> showed that our predictions were not only not very accurate. To get an idea of this metric, imagine trying to guess people's ages and comparing your guesses with their actual ages. The **MSE** tells you, on average, how far off your guesses are, but it squares the differences to make sure that all errors are positive and to give more weight to larger errors, but this value is good or bad depending on the size of our inputs, if the profitability values are large, an MSE of 76.96 might be relatively small. However, if the profitability values are small, this MSE could be considered high. 

The metric we usually have to complement this assesment is the *evaluation of the correlation between predicted and actual values*, its notation is `R-squared` and whose values range from 0 to 1. With higher values indicating a better model fit. An R2 of 0 means that the model does not explain any variance in the target variable, while an R2 of 1 means that the model perfectly explains all the variance, and a negative result, as we had with <mark>`R2: -0.03`</mark>, means that our predictions were no better than random guessing.

On the other hand, when a so-called engineering feature was applied, as mentioned earlier and described in detailed later in this report it began to produce perfect metrics, revealing potential overfitting problems and pointing to a fundamental limitation of the linear approach for this type of forecasting task.

#### Next Steps
   - To move forward, I provide a comprehensive overview of each modeling step, including decisions made, problems encountered, and the corresponding resolutions. The lessons learned from this process will serve as a foundation for refining future models and expanding their applicability to real-world investment scenarios.
   - This document pretend captures the essence of my project—its aims, the challenges, and the valuable insights gained about the limitations of e.g. linear models for complex economic forecasting and sets the stage for the more detailed sections to follow, where I feel I should break down my journey step-by-step.


### Reviewed_sub_version</sub>

>On summarising the project’s journey and the key insights gained, model's limitations and the broader learning experience. A reflective analysis providing both technical depth and insight into the process of building and evaluating models.

*Dear Stakeholders, Teacher, colleagues, evaluator..*

In this report, I explore the development of a prediction model to help businesses decide where to expand. Using 25 years of data, I aimed to create a tool that could forecast how profitable a new location might be, based on various economic and social factors.

#### The Journey Begins
  I started with a simple idea: use information like how fast a country's economy is growing, how quickly its population is increasing, and how educated its people are to predict business success. These factors came from a larger set of 18 world indicators, which I narrowed down to the most relevant ones.

#### Challenges and Learning
   As I dug deeper, I realized that predicting business success is more complicated than I first thought. My initial approach, using a straightforward method called Linear Regression, wasn't capturing the full picture. Here's what I learned:
  1. **Simple models have limits**: While great for learning, basic models often can't handle the complexity of real-world economics.
  2. **Numbers can be deceiving**: My first results, after a first important correction in the number of features included, looked perfect on paper, but this was a red flag. It suggested the model was "overfitting" – essentially memorizing the data instead of learning from it.
  3. **The importance of the right ingredients**: I created new ways to look at the data, like combining economic growth with population to get an "Income Growth Rate." This helped, but also showed we needed even more sophisticated approaches.

#### Moving Forward
   This project taught me valuable lessons about building prediction models:

  - We need to use more advanced techniques that can capture the twists and turns of economic data.
  - It's crucial to include a wider range of economic factors, like inflation and interest rates, even sector-specific data.
  - Constantly testing and questioning our models is key to making them truly useful.
    
 While my initial model didn't fully crack the code of predicting business success, it laid a strong foundation for future work. In the following sections, I'll break down each step of my journey, sharing the problems I faced and how I tried to solve them.
 This report isn't just about the end result – it's a roadmap for anyone interested in using data to make better business decisions, showing both the potential and the pitfalls along the way.


<a id="orgdaff416"></a>

# The scope of the project (including key performance indicators)


<a id="orgbfb95b5"></a>

## Exploring the Relationship between Economic Indicators and Profitability

The objective of this project is to investigate the relationship between various economic indicators and a company's profitability. The project aims to identify the most important economic indicators that contribute to a company's profitability and to develop a model that can predict profitability based on these indicators.


<a id="orgdffd7f0"></a>

## Key Performance Indicators (KPIs)

The project focuses on the following KPIs:

Mean Squared Error (MSE): measures the average squared difference between predicted and actual values
R-squared (R2): measures the proportion of the variance in the dependent variable that is predictable from the independent variables
Mean Absolute Error (MAE): measures the average absolute difference between predicted and actual values
Mean Absolute Percentage Error (MAPE): measures the average absolute percentage difference between predicted and actual values


<a id="orge14fda7"></a>

## Model Performance

The model achieved, as reported earlier, after a first score of MSE (Mean Squared Error): 76.96, and R2: -0.03 and applied an enhanced metrics as I will detail below in this document, a perfect scores on the testing data, with an MSE of 0.00, R2 of 1.00, MAE of 0.00, and MAPE of 0.00%. However, this perfect performance raised concerns about overfitting, and further analysis was conducted to evaluate the model's generalization capabilities.


<a id="org1b48129"></a>

## Feature Importance

The permutation importance analysis revealed that the <mark>GDP per capita growth rate</mark> is the most important feature, followed by the <mark>adult literacy rate</mark> and <mark>average years of schooling</mark>. These features are all related to a country's economic and human development, which are likely to be important factors in determining profitability.


<a id="org2573986"></a>

## Limitations and Future Work

Despite the promising results, the project encountered limitations in visualizing the SHAP values using the `shap.plots.beeswarm function`. This limitation highlights the importance of considering the model design and the specific requirements of the visualization tools used.

Overall, this project provides a valuable learning exercise in exploring the relationship between economic indicators and profitability. The results suggest that the model can be a useful tool for predicting profitability, but further work is needed to refine the model and address the limitations encountered.


<a id="org37f6920"></a>

# Project outcomes and how the outcomes were achieved

The project aimed to forecast profitability, which is an expected challenge for any business engaged in this particular exercise. However, the challenge is particularly pronounced in the case of the retailer under evaluation, given that it is already a high-end fashion retailer targeting high net worth individuals and focused on being an ethical trader. In these terms, centering attention in `High-Income Countrie`s (HICs) by leveraging indicators such as `GDP growth`, `population growth rate`, and `educational achievements` appear as a clear first marketing filtering. Stakeholders also expressed particular interest in understanding how population growth and education—key drivers of long-term economic sustainability—impact profitability.

Through feature engineering, considering that a first outcome in terms of `MSE: 76.96, R2: -0.03 MSE: 76.96` estimated on a proxy indicator, the` Income Growth Rate (IGR)` based this on the behaviour of the `GDP per capita`, which among GDP measures provides the average standard of living within a country suggested that the model was not performing well in capturing the underlying patterns in the data and predicting profitability, indicators like `Population Growth Rate` and `Average Years of Schooling` were additionally, on a second version of the model, crafted to capture these dynamics.

However, while the resulting `Linear Regression` model produced seemingly this time perfect metrics, including an <mark>MSE of 0.00 and R2 of 1.00</mark>, it became apparent that these results were too good to reflect real-world economic complexity. The overfitting issues were uncovered by applying additional techniques like `Cross-validation` and `Lasso Regression`, which helped reveal the model's limitations. Despite these challenges, the analysis underscored the significant role that population growth and educational attainment play in shaping long-term profitability, validating the importance of these indicators for the stakeholders' involvement in future investment strategies.


<a id="orge108898"></a>

# A project plan


<a id="org81976a5"></a>

## A Draft

The first question I had here was considering the provided datasets, how to approach a profit model and address to the forecasting assessment, and as I cannot help I started by defining the arrival point which I use to explain using the following analogy. —*Obviously there are many ways to get to a place*, but in this case the place I want to go to is a problem that has already been solved, which I nevertheless reproduce as a learner, and I see my learning as training in solutions, inventiveness is not the first task here, at least not in the sense of getting something that was not there before, but in the applicability of solutions to new problems, so the method I use is to *define my point of arrival*, and my report consists in telling how I did to get to the point of arrival. 

### A Python Snippet as example
```python
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Load and preprocess the data
df = pd.read_csv('our_data.csv')
df = df.dropna()  # handle missing values, cleaning, etc.

# Assume you have a Pandas DataFrame 'df' with the selected features and target variable
X = df.drop(['target_variable'], axis=1)  # features
y = df['target_variable']  # target variable

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df.drop('profitability', axis=1), df['profitability'], test_size=0.3, random_state=42)

# Train a random forest regressor model
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)

# Evaluate the model on the testing data
y_pred = lr_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'MSE: {mse:.2f}')

# Use the trained model to forecast profitability for new locations
new_locations = pd.DataFrame({'feature1': [1, 2, 3], 'feature2': [4, 5, 6]})
new_locations = pd.get_dummies(new_locations, columns=['categorical_variables'])
predicted_profitability = rf.predict(new_locations)
print(predicted_profitability)

```
### Getting warm at doing things programmatically (or in an automated way)

  As I have said before, there are obviously many paths to come to Rome. I started to get into the terrible habit of doing this sort of thing programmatically after watching my classmates working in Excel, that famous spreadsheet software. I feel should not go any further without first apologising for turning this initial report into such a soliloquy, but I felt it necessary to establish a discretionary basis for this and other decisions I made in completing this exercise. >>>(or, quoting) you may depend upon my bare word, reader, I am a regular user of spreadsheets yes, but never for these uses. Faced with so many columns and their entries, over 2895 counts at a glance when those all 18 world bank series were in front of me, it was a truly intimidating experience. What a difference when you are a regular user of tables on spreadsheets. And that is enough explanation.
    
  The second reason is that all those nifty features that you can find in tutorials on how-to using Excel especially, if you are looking to rebuild your Excel-spreadsheet skills, are sort of half-truths. They are only present in the professional version. Yes, there is a more privileged version under the auspices of this course, although temporary or only valid during the time of this training. Yet, it would have been a good option even so, but it was a bit late. When I found out that I had already started to use it programmatically and only occasionally the old-fashioned way.

### Everything (can) get started as a list.

  Here is the list of indicator, series, or features, we are going to use these terms indistinctly.
    
#### Indicators as our source list. 
    
```bsh
series_list = "Population Male ages 18, Population Female ages 18, Life expectancy at birth, Fertility rate, Net migration, Literacy rate. Adult total (% of people ages 15 and above), Government expenditure on education (total % of government expenditure), GDP growth (annual %), Primary Energy Production, Renewable electricity output (% of total electricity output), Population density (people per sq. km of land area), PM2.5 air pollution mean annual exposure (micrograms per cubic meter), Adjusted savings: natural resources depletion (% of GNI), Income share held by lowest 20%, Gini index (World Bank estimate), Political Stability and Absence of Violence/Terrorism: Estimate, Annualised average growth rate in per capital real survey mean consumption or income (total population (%)), Ease of doing business rank (1=most business-friendly regulations), Internet users."

```
    
#### Our Source list a python object.
    
  We can get started to get familiar con the elements of reasoning of our project if we could convert or indexing this content. As you can find above the source list the entire list of indicators are a whole piece within quotes, we require it as individual elements, we need split that list into its own quotation marks and we can use the following snippet `$ series_list = series_list.split(", ")`.

```python        
    $ series_list = series_list.split(", ")`.
```
        
   Now we have our series list as an object from where we can call its elements by index.
        
```python
     ["Population Male ages 18","Population Female ages 18","Life expectancy at birth", "Fertility rate", "Net migration", "Literacy rate. Adult total (% of people ages 15 and above)","Government expenditure on education (total % of government expenditure)","GDP per capita","Primary Energy Production","Renewable electricity output (% of total electricity output)","Population density (people per sq. km of land area)","PM2.5 air pollution mean annual exposure (micrograms per cubic meter)","Adjusted savings: natural resources depletion (% of GNI)","Income share held by lowest 20%","Gini index (World Bank estimate)","Political Stability and Absence of Violence/Terrorism: Estimate","Annualised average growth rate in per capital real survey mean consumption or income (total population (%))","Ease of doing business rank (1=most business-friendly regulations)","Internet users"]`
```        
E.g. in the thread above `$ print(series_list[7]) == GDP per capita` and so on. We can call any of the indicators in our list by its index, let's see the examples. This becomes useful in conjunction with a library I found in the `pip` repository.

```python        
            $ print(series_list[7])  >>>>>> GDP per capita
```
                                
In these terms we can call 
        
```python
     import wbgapi as wb
            
     foo=series[9]
     more_foo=wb.search(foo)
     print(more_foo)
```                        
So that if we could do for retrieve more info about a serie specifically, we could craft a function which wuld look like the example below
            
```python
   def whats(n):
       foo=series[foo]
       more_foo=wb.search(foo)
       print(f"about {foo} we got {more_foo}")
   ###test for instance `$ whats(2) will give us the following output:
        
   # output for $ whats(2)
        
about Life expectancy at birth we got ========
Series: SH.DYN.0509
                
 Developmentrelevance: ... children, adolescents, youth and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
 ========
    Series: SH.DYN.1014
                
Developmentrelevance: ... children, adolescents, youth and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SH.DYN.1519
                
Developmentrelevance: ... children, adolescents, youth and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SH.DYN.2024
                
Developmentrelevance: ... children, adolescents, youth and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SH.DYN.MORT
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SH.DYN.MORT.FE
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SH.DYN.MORT.MA
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SH.DYN.NMRT
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SP.DYN.AMRT.FE
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SP.DYN.AMRT.MA
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SP.DYN.IMRT.FE.IN
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SP.DYN.IMRT.IN
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SP.DYN.IMRT.MA.IN
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
========
    Series: SP.DYN.LE00.FE.IN
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
--------
IndicatorName: Life expectancy at birth, female (years)
--------
Longdefinition: ...Life expectancy at birth indicates the number of years a newborn infant would live if prevailing...
--------
Statisticalconceptandmethodology: ...Life expectancy at birth used here is the average number of years a newborn is expected to live if...
========
    Series: SP.DYN.LE00.IN
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
--------
IndicatorName: Life expectancy at birth, total (years)
--------
Longdefinition: ...Life expectancy at birth indicates the number of years a newborn infant would live if prevailing...
--------
Source: ... World Population Prospects: 2022 Revision; or derived from male and female life expectancy at birth from sources such as: (2) Statistical databases and publications from national...
--------
Statisticalconceptandmethodology: ...Life expectancy at birth used here is the average number of years a newborn is expected to live if...
========
    Series: SP.DYN.LE00.MA.IN
                
Developmentrelevance: ...age groups (infants, children, and adults) and overall mortality indicators (life expectancy at birth or survival to a given age) are important indicators of health status in a...
--------
IndicatorName: Life expectancy at birth, male (years)
--------
Longdefinition: ...Life expectancy at birth indicates the number of years a newborn infant would live if prevailing...
--------
Statisticalconceptandmethodology: ...Life expectancy at birth used here is the average number of years a newborn is expected to live if...
    
```

    
#### Getting into a DF object
    
   Rather generic metadata, and in some cases, for reasons unknown to me at the time of writing, this operation is not always error-free. So we have to go more manually, for example by creating a CSV with the code name of each of our indicators appended.
   In my case, I ended up with a couple of tools that will be so useful during this exploration.
        
  [series_list](series_list.png) | [series_list.html](series_name_code.html)
        
   However, the views above, we need to operate in more dynamic terms and understand dynamic in terms of data, so we will upload our workbench as a data-frame 'df' object and operate in more appropriate ways:
        
```python            
 # load our series_list CSV, get an indexed object manipulation.
 ds_read='series_name_series_code.csv'
 df=pd.read_csv(ds_read)
            
 print(df['Series Code']) #to display a column 'Series Code'
 Series_c_list=df['Series Code'].to_list()
            
 #notice from here on series_name_series_code as `series_N_C`
 series_N_C=list(zip(df['Series Name'].to_list(), df['Series Code'].to_list()))  #this line will create a indexed object.
 
 series_N_C[19][0]  #and so on..

```            



### Building our dictionary of countries

We will also need to know the countries we are going to work with. Let us build our dictionary of countries, starting with those labelled `HIC` (High Income Countries) by the World Bank's database warehouse. To avoid getting lost in unnecessary detail I will say that at this point in the report I have a system, but my first contact was to read hundreds of lines of metadata online. This is the method I now use for this same task. At first I managed to download a table that I intended to convert into a CSV object. The file looked like a table, but I realised that I could not perform operations such as filtering or deleting columns as I intended. Later I discovered that it was a table, but a single-column table formed with separators (not tab or comma ones), so that it did not obey the expected column treatment. You can try it and confirm.
    
```python        
        hic_countries=wb.income.members('HIC)
        print('Number of High Income Countries:', len(hic_countries))
        
        table_of_hic_countries=[wb.economy.info(country).table() for country in hic_countries] #displaying as TABLE
        table_of_hic_countries #
    
        for country in table_of_hic_countries:
            print(country[0][1])
        
        country_names_i=[wb.economy.info(country).items for country in hic_countries] #this gives a dict for item ✓
        
        country_names_i[0][0]['value'] #since it's an indexed object we can guess how to get its embedded elements
        
        country_names=[wb.economy.info(country).items[0]['value'] for country in hic_countries]  #with this line we can collect them in a list.
```
    
After crafting the above pieces we can have the following gadget, a key value list of elements we can use for carrying on our exploration in a programmatically manner.
 

```python   
        # hic_countries will alias now on to  = hic_c
        
        hic_c={}
        for code, name in zip(hic_countries,country_names):
            #print(f"Code: {code}, Name: {name}") #or
            #print(f"{code}, {name}") #or
            hic_c[code]=name
```

### Usage of our gadget-dictionary.

Let's suppose we require a quick overview about metadata of any of our indicators, say we call it `fo`

```python
  foo=Series_N_C[5][1] # by the series_code in our indexed object.
  # We can ask about foo programmatically this way:
  whats_foo_info=(wb.series.info(foo_info)) # info for a quick reference
  whats_foo_metadata=(wb.series.metadata.get(foo)) #for the metada, more detailed report about our foo indicator
        
  print(whats_foo_info) # ✓
  print(whats_foo_metadata) #✓
```
    
Notice that on applying the above snippet some indicators fails at info but perform as expected at the metadata query, so this operation cannot be considered conclusive. 

### Filter and identifying errors at fetching metadata:

We can also filter at once which series are given lets say any unknown by this point kind of issue at once, since the stage of exploring on their metadata.
    
```python        
  def faulty_series(series_codes): #
      faulty_series=[]
      for code in series_codes:
          try:
              info=wb.series.info(code)
              # print(info) comment or uncomment for debugging
          except Exception as e:
              # print(f"An error ocurred while dealind with {code}: {e}") ✓
              faulty_series.append(code)
              # (f"The following series requiere individually attention {faulty_series}")
              continue
      return faulty_series
        
  issues=faulty_series(Series_c_list)
        
  print(issues) #✓        
```    

In reviewing this snippet for the purposes of this report, I noticed that the output of this function changes. I had output [1] when I started working on it and now I have output [2]. Which shows that this is just an eventuality. For precious weeks of apprentice work, I thought that just finding out what the series was about was terrible work.
    
[1]The following series requiere individually attention `['SP.POP.AG18.MA.IN', 'SP.POP.AG18.FE.IN', 'SE.XPD.TOTL.GB.ZA', 'PV.EST.PV', 'SL.SPR.PCAP.ZG']` 

[2] now faulty series outcome is >>> `['SP.POP.AG18.MA.IN', 'SP.POP.AG18.FE.IN', 'PV.EST.PV', 'SL.SPR.PCAP.ZG', 'IGR']`

### Get metadata and issues at once

 Given the possibility commented on in the previous section, we could also retrieve our metadata on a variable and have it and add the missing information when the availability improves in our favour. Here is the snippet I used for this purpose.

```python    
  def display_series_info(series_codes):
      #now lets try to get metadata for our indicators
      info_results={}
      issues_with=[]
      for code in series_codes:
          try:
              info=wb.series.metadata.get(code)
              info_results.update({code:info})
          except Exception as e:
              #print(f"An error ocurred while dealing with {code}: {e}")
              issues_with.append(code)
              continue
      return info_results, issues_with
        
  # 'issues_with' list, will be the second object returned by the series_info function. 
        
  # Atention as here we have 2 returns, we must specify which we want to query for (in jupiter this is not needed, it defaults to return[0])
  series_metadata=display_series_info(Series_c_list) 
  series_metadata[0][Series_c_list[11]] #the first `[0]` means we are talking abbout the first return of `display_series_info` the `info_results`
  len(series_metadata[0])
        
  now_faulty_series=display_series_info(Series_c_list)[1] #access the second element of the returned tuple using index 1.
  print(now_faulty_series) #>>>>>['PV.EST.PV', 'SL.SPR.PCAP.ZG', 'IGR']
```

<a id="org691c41d"></a>

## Step (preliminary) 1: Data Preprocessing and Exploration

Clean and preprocess the data by handling missing values, outliers, and data normalisation.
Explore the data to understand the distribution of each variable, correlations, and relationships between variables.

### Dealing with fetching data frames and scan inside.

#### Arrival Point: `There should be a function for that..`
    
  Not because fetching data framework from data warehouses, in this case biased to the World Bank Data Warehouse was the point of arrival, but the assembly in the sense of harmonising all the components involved in the fetching process so that its inspection and cleaning has a direct flow and no bottlenecks. 

I have dealt with at least three cases, 
  - Downloading them using libraries, including here my point of ignorance at each step of the process, 
  - A second type of cases e.g. when I have had to do it by manual download by filling out the download form on the World Bank Warehouse website 
  - And then the variations related to the eventualities of each dataset. 

Since at a certain point there are tasks that repeat themselves the question is whether I could build a function for them, that is the spirit of this section of the report.
    
#### Twin Scripts, a, b
    
##### The Python libraries
        
  All details matters, so this the group of common libraries for this section in the report and focus only in the incremental information at each step.
            
```python
  import pandas as pd
  import wbgapi as wb
  import matplotlib.pyplot as plt
  import matplotlib.dates as mdates
```        
        
##### Script a
        
   [script_a_serie_N_C[10]](script_a_snc-10.png)
 
```python           
 # Download data from World Bank
 series_Name_code=series_N_C #this to get the alias
                
 # Download data from World Bank
 indicator = series_Name_code[5][1]  # 'Literacy rate. Adult total (% of people ages 15 and above)', 'SE.ADT.LITR.ZS'
 countries = ['USA', 'GBR', 'DEU','ESP']  # List of countries codes for a first sample 
 data = wb.data.DataFrame(indicator, economy=countries)
                
 # Convert data to pandas dataframe
 df = data.transpose()
 df=df[df.index >= 'YR1999'] #this line filters over the 25 years span 
                
 # Plot timeseries for each country and have a first look 
 # Check if the DataFrame is empty
 if df.empty:
     print("Error: Fetched DataFrame is empty. Check the indicator and country codes.")
 else:
     # Print the first few rows of the DataFrame for inspection
     print(df.head())
                
     # Plot timeseries for each country
     plt.figure(figsize=(10, 6))
     for country in countries:
         if country in df.columns:  # Check if the country exists in the DataFrame
             plt.plot(df.index, df[country], label=country)
         else:
             print(f"Warning: Data not found for country: {country}")
                
                    # Set x-axis to show every 5th year (new feature ✓)
                    plt.xticks(df.index[::5])
                    plt.ylabel('(% of people ages 15 and above) (SE.ADT.LITR.ZS)')
                    plt.title('Adult Literacy Rate (SE.ADT.LITR.ZS) for {}'.format(', '.join(countries)))
                    plt.legend()
                    plt.grid(True)
                    plt.show()
```
![](fixing-s8.png)
*fig Fixing plotting, exercise 03
        
        
##### Script b
        
  The plan here of  using the same indicator and group of countries is focusing on the script, controlling that the content itself namely status of the dataset affect the execution of the scrip for next recollections.
  Differences here in the definition of time span of data frames to deal with the case of partial data sets respect of the 25 years span time target, and we require specify that value in the variable `time`.

![](gdp_CHN_00.png)
*fig Example, exercise 06, plotting.

            
```python                
  # Download data from World Bank
  indicator = series_Name_code[10][1] # Series code ==> series_N_C 
  countries = ['USA', 'GBR', 'DEU','ESP']  # List of countries (ISO2 codes)
  start_year = 1999  # Starting year for data download
  end_year = 2022  # Ending year for data download (adjust as needed)
  
  # Get data using wb.data.DataFrame
  data = wb.data.DataFrame(indicator, economy=countries)
                
  # Convert data to pandas dataframe (transpose not required)
  df = data.transpose()
  # Filter data by time range
  df = df[df.index >= f'YR{start_year}']
  df = df[df.index <= f'YR{end_year}']
  df.index = df.index.str.replace('YR', '').astype(int)  # Remove 'YR' from index
  # Check if the DataFrame is empty
  if df.empty:
      print("Error: Fetched DataFrame is empty. Check the indicator and country codes.")
  else:
      # Print the first few rows of the DataFrame for inspection
      print(df.head())
  # Plot timeseries for each country
  fig, ax = plt.subplots(figsize=(10, 6))
  for country in countries:
      ax.plot(df.index, df[country], label=country)
  #plt.xlabel('Year')
  plt.xticks(df.index[::5])
  plt.ylabel(series_Name_code[10][0]) #rather than the line above we are working with the ad-hoc index created for this purpose.
  plt.title(series_Name_code[10][0]+' for {}'.format(', '.join(countries)))
  plt.legend()
  plt.grid(True)
  plt.show()
```        
![](script_b_snc-8.png)
*fig Indicator, 8 excercise 9
  
##### New tests
        
   
###### Series_Name_code[8]  # 'Primary Energy Production', 'EG.EGY.PRIM.PP.KD'

```python            
 import pandas as pd
 import wbgapi as wb
 import matplotlib.pyplot as plt
 #import matplotlib.dates as mdates
                    
 # Download data from World Bank
 indicator = series_Name_code[8][1] # ('Primary Energy Production', 'EG.EGY.PRIM.PP.KD')
 countries = ['USA', 'GBR', 'DEU']  # List of countries (ISO2 codes)
 # Get data using wb.data.DataFrame
 data = wb.data.DataFrame(indicator, economy=countries, time=range(1999,2023)) #time by range
 # Convert data to pandas dataframe
 df = data.transpose()
 df.index = df.index.str.replace('YR','').astype(int)
 # Check if the DataFrame is empty
 if df.empty:
     print("Error: Fetched DataFrame is empty. Check the indicator and country codes.")
 else:
     # Print the first few rows of the DataFrame for inspection
     print(df.head())
     # Plot timeseries for each country
     plt.figure(figsize=(10, 6))
     #fig, ax = plt.subplots(figsize=(10, 6))
     for country in countries:
         plt.plot(df.index, df[country], label=country)
                    
     plt.ylabel(series_Name_code[8][0])
     plt.title(series_Name_code[8][0]+' for {}'.format(', '.join(countries)))
     plt.legend()
     plt.grid(True)
     plt.xticks(df.index[::5])
     plt.show()
```

![](scrip_a_snc-5.png)
* exerc.12 Indicator 5


            
###### Series_Name_code[14] # 'SI.POV.GINI' # 14 ('Gini index (World Bank estimate)', 'SI.POV.GINI')
```python          
  import pandas as pd
  import wbgapi as wb
  import matplotlib.pyplot as plt
  #re-written entirely again
  # Define the series code and countries
  indicator = 'SI.POV.GINI'  # 14 ('Gini index (World Bank estimate)', 'SI.POV.GINI')
  countries = ['USA', 'GBR', 'ESP', 'DEU']
                    
  # Fetch the data for the last 25 years (adjust as needed)
  data = wb.data.DataFrame(indicator, economy=countries, time=range(1998, 2023))
                    
  # Transpose the data for easier plotting
  df = data.transpose()
  #df = df.set_index('economy')
  df.index = df.index.str.replace('YR', '').astype(int)  # Remove 'YR' from index
  # Plot the data
  plt.figure(figsize=(10, 6))
  for country in countries:
  plt.plot(df.index, df[country], label=country)
                    
  # Customize the plot
  plt.ylabel('Gini index (World Bank estimate)')
  plt.title('Gini index for {}'.format(', '.join(countries)))
  plt.legend()
  plt.grid(True)
  plt.xticks(df.index[::5])
  plt.show()
```
![](scrip_e-snc-14.png)
*fig Indicator, 14 exercise 15 

            
###### Series_N_C[13] # 'Income share held by lowest 20%', 'SI.DST.FRST.20'

```python            
series_code = series_N_C[13][1] #('Income share held by lowest 20%', 'SI.DST.FRST.20')
countries = ['USA', 'GBR', 'ESP', 'DEU']
                    
 # Define the time range
 end_year = 2023
 start_year = end_year - 25
                    
 # Fetch the data
 data = wb.data.DataFrame(series_code, countries, time=range(start_year, end_year+1))
                    
 # Transpose the data for easier plotting
 data = data.transpose()
 data.index = data.index.str.replace('YR', '').astype(int)  # Remove 'YR' from index

 plt.title(series_N_C[13][0]+' Over the Last 25 Years')
 #plt.xlabel('Year')
 plt.ylabel(series_N_C[13][0]')
 plt.xticks(df.index[::5])
 plt.legend()
 plt.grid(True)
 plt.tight_layout()
 plt.show()

```
![](script_e-snc-13.png)
*fig Indicator, 13. excercise 21

![](script_a_snc-10.png)
*fig Indicator, 10 exec. 18
    
#### Entirely done Manually
    
As I wrote in my journal sketch for this project, after covering the case, as in the previous ones, of still working with the ‘Wbgapi’ library or eventually with any other but having to do the download of the DS one by one, we now enter a case even more full of exceptions as we can describe the fact that due to eventual problems related to the server connection, we would have to download the DS completely by hand and prepare them in some simple but crucial aspects e. g. selecting the necessary columns, transposing row to column or the other way round (which would later improve the preliminary visualisations in the reports), then setting the index, or restarting it at will when the time comes. 
        
##### Entirely done in two steps
        
  Doing this task in two steps involved in my case the lesson related to set the index, crucial as in my case I was working wit multi-index data frames that eventually required reset it and back.
            
###### Step one
            
   Once downloading the DS from the World Bank Warehouse.
                
 ```python

 # after downloaded
   import pandas as pd
                    
    # Load the manually downloaded data into a DataFrame
    #df = pd.read_csv('path_to_our_file.csv')
    #I tested this routine with a DS from my faulty DS list
    df = pd.read_csv('~/SP.POP.AG18.MA.IN.csv')
    
    # Set the 'Year' column as the index
    df.set_index('Year', inplace=True)
    
    # Remove any unnecessary columns (like 'Year Code')
    df.drop(columns=['Year Code'], inplace=True)
    
    # Print column names to inspect the format
    print(df.columns)
    # in this case columns are of the form
    # "Age population, age 18, male [SP.POP.AG18.MA.IN] - United States [USA]".
    
    # Define the correct regex pattern to extract country codes
    # so in order to capture the country codes at the end of the line:
    pattern = r'\[([A-Z]{3})\]$'
    
    # Extract the country codes and rename the columns
    df.columns = df.columns.str.extract(pattern)[0]
    
    # Print the cleaned DataFrame to verify
    print(df.head())
    output='SP.POP.AG18.MA.IN.csv'#this is a test check location, etc
    df.to_csv(output, index=True)
    # Now, the DataFrame should have years as the index and country codes as columns
 ```


###### Step two
            
   Now, will come time to load our almost prepared DF and scan it and try to plot its content.

```python
                
    # first load our sample 'Population Male ages 18', 'SP.POP.AG18.MA.IN'
    df_c=pd.read_csv('SP.POP.AG18.MA.IN.csv', index_col='Year') #notice we are setting the index despite the saved done above.
    #CHECKING OUT 
    #print(df_c.head())
    print(df_c.columns)
    #df_c.tail()
    df_c=df_c.iloc[: -5]  #to cut off the las 5 rows [important!]
    c=['USA','GBR','ESP','DEU']
    plt.figure(figsize=(12, 8))
    for i in c:
      plt.plot(df_c.index,df_c[i],label=i)
    
    plt.title('Population Male ages 18: SP.POP.AG18.MA.IN')
    #plt.xlabel('Year')
    plt.ylabel('Population Male ages +18)')
    #plt.xticks(rotation=45)
    plt.xticks(df_c.index[::2])
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()
```        
![](e_manual_p2-SP.POP.AG18.MA.IN.png)  
* fig Indictor 8 SP.POP.AG18.MA.IN


##### Entirely done in one step

```python 
        
   # Load the manually downloaded data into a DataFrame
   df = pd.read_csv('SP.POP.AG18.MA.IN.csv')
   # Set the 'Year Code' column as the index rather than 'Year' as above
   df.set_index('Year Code', inplace=True)
   df=df.iloc[: -5]  #IMPORTANT!
   df.index = df.index.str.replace('YR', '').astype(int)  # Remove 'YR' from index
   df.columns.tolist()
   # Remove any unnecessary columns (like 'Year' a change here )
   df.drop(columns=['Year'], inplace=True)
   # Define the correct regex pattern to extract country codes from columns as
   # explained above
   pattern = r'\[([A-Z]{3})\]$'
   
   # Extract the country codes and rename the columns
   df.columns = df.columns.str.extract(pattern)[0]
   
   # Print the cleaned DataFrame to verify
   print(df.head())
   # Now, the DataFrame should have years as the index and country codes as columns
   # Check if 'Year' column exists before setting it as index
   if 'Year Code' in df.columns:
       df.set_index('Year Code', inplace=True)
       df['Year Code'] = df['Year Code'].astype(int)
   else:
       print("Column 'Year' not found in DataFrame.")
       # Investigate why 'Year' is missing and take appropriate action EDIT `inplace=True` was missing above in `df.set_index`
   
   plt.figure(figsize=(12, 8))
   for i in c:
     plt.plot(df.index,df[i],label=i)
   
   plt.title('Population Male ages 18: SP.POP.AG18.MA.IN')
   plt.ylabel('Population Male ages +18)')
   plt.xticks(df.index[::2])
   plt.legend()
   plt.grid(True)# in this case better grid False, used grid to easy get differences with the previous plot
   plt.tight_layout()
   plt.show()    
```

    
#### The function that should be get done is done
    
 After repeating the process of fetching data for cleaning and exploration again and again, I finally came up with a function for that so that centering my work entirely in what to do with the corpus of thing I had before the eyes of my questions. This is the version one. I say version one now at the point of the final report but at the step of find it, it was the ultimate product. I do not want to spoil myself so foe now lets have a look to my artefact.

```python
   #provided e.g. that:
   #libraries are loaded 
   c=['USA','GBR','ESP','DEU'] #countries as c for easier the room in line below.
   
   def plotit(indicator, countries, time, title):                              
       wb.data.DataFrame(indicator,economy=countries,time=range(time[0],time[1]),numericTimeKeys=True,labels=True).set_index('Country').transpose().plot(figsize=(20,6),title=title)                                                         
       plt.show()
            
   plotit(series_N_C[11][1],c,time:=[1999,2024],series_N_C[11][0]) # a sample, as explained using my indexed gadget to input indicators in the query
```

<a id="org0c09d72"></a>

## Step (preliminary) 2: Feature Engineering and Selection

Identify the most relevant features that can impact the profitability of the company. Some potential features to consider:
After inspection in deep of the possibilities I had to complete a profitability model to test in the context of the business requirements in this case I came up with the following selection: 
• Population demographics (e.g., Population Male/Female ages 18) to estimate the target market size.\
• Economic indicators (e.g., GDP growth, Income share held by lowest 20%, Gini index) to assess the purchasing power and income inequality. \
• Education and literacy rates to evaluate the potential for high-end fashion demand. \
• Environmental and social factors (e.g., Renewable electricity output, PM2.5 air pollution) to align with the company's ethical trading values. \
• Business environment indicators (e.g., Ease of doing business rank, Political Stability) to assess the regulatory and operational ease. \

<a id="orga78082a"></a>

## Step (preliminary) 3: Model Evaluation and Hyperparameter Tuning

Evaluate the model's performance on the testing data to estimate its generalization capabilities.
Perform hyperparameter tuning using techniques like Grid Search, Random Search, or Bayesian Optimisation to optimize the model's performance.

<a id="org3c24a01"></a>

## Step (preliminary) 4: Forecasting Profitability

Use the trained model to forecast profitability for new, unseen locations.
Input the feature values for the new locations into the model to obtain predicted profitability scores.


<a id="org04e078a"></a>

# Step 1 Define the Target Variable

Target Variable in this exercise is `Profitability` but as we do not have a direct measure of profitability, we will need to create a proxy variable. We can use the GDP growth as a proxy variable, assuming that higher growth rates are associated with higher profitability.

With that target I will start building a Model for this concept and following the known technique for this purpose, I will then:

- Split the pre-processed data into training (~70%) and testing sets (~30%).
- Develop a profitability model using a suitable algorithm, such as:
- Linear Regression: to model the relationship between the selected features and profitability.
- There are some other options to study this connection between our variables, namely the following below but I decided to check the immediately kind of mirror connection between the main economic indicators.
   - The others algoritms in the pool:  
     - Decision Trees or Random Forest: to handle non-linear relationships and interactions between features.  
     - Clustering Analysis: to identify groups of similar locations with high profitability potential.  

- Train the model using the training data and evaluate its performance using metrics like Mean Absolute Error (MAE), Mean Squared Error (MSE), or R-squared.


<a id="org945a034"></a>

## Select Relevant Values.

From the 18 indicator we have been in contact so far I have decided the following seven have the core information to test the growth potential we need to decide the target business. 

- GDP per capita
  `Series_N_C[7]` :**NY.GDP.PCAP.KD.ZG** in our indexed object.
- Income growth rate [?][?]  **IGR** <mark>(crafted as detailed later on) ✓</mark>
- Population demographics (e.g. population aged 18-65), [0]:SP.POP.AG18.MA.IN, [1]:SP.POP.AG18.FE.IN
  `series_N_C[0]` :**SP.POP.AG18.MA.IN** 

  `series_N_C[1]` :**SP.POP.AG18.FE.IN**
- Education and literacy rates
  `series_N_C[5]` :**SE.ADT.LITR.ZS**
- Gov. expenditure on education
  `series_N_C[6]` :**SE.XPD.TOTL.GB.ZA**
- Ease of doing business rank
  `series_N_C[17]`:**IC.BUS.EASE.XQ**
- Renewable energy output.
  `series_N_C[9]` :**EG.ELC.RNEW.ZS** 

<a id="org9b75a74"></a>

### Core DataFrame

From the summary detailed above we now can define a variable tool to narrow our next steps

```python 
    core=[17, 5, 6, 9, 7, 0, 1, 19]


core=[0, 1, 5, 6, 7, 9, 17, 19] #following the reference of our indexed object.
[SP.POP.AG18.MA.IN, SP.POP.AG18.FE.IN, SE.ADT.LITR.ZS, SE.XPD.TOTL.GB.ZA, NY.GDP.PCAP.KD.ZG, EG.ELC.RNEW.ZS, IC.BUS.EASE.XQ]

```
<a id="org6651bc8"></a>
### The Core Data-Frame for model testing

The final version of the base model will have the following structure, given by `$data.shape`, `$data.columns`, and `$data.index`.
And then, after this section, which the reader will have become familiar with and which I describe as the arrival point, you will find all our how-tos. 

This was done by compiling our selected pointers and henceforth called core model, sorted the missing or null or NaN data, different procedures to establish the index concept on which to merge all partial tables. Then, after weighing our options and the context of the present approach, we selected a criterion to organise the visualisations, this is the `last-year-in-the-series-time` IGR ranking.

```python
    >>> data.shape
    (2125, 10)
    
    >>> data.columns
    Index(['economy', 'time', 'IC.BUS.EASE.XQ', 'SE.ADT.LITR.ZS',
           'SE.XPD.TOTL.GB.ZS', 'EG.ELC.RNEW.ZS', 'NY.GDP.PCAP.KD.ZG', 'IGR',
           'SP.POP.AG18.FE.IN', 'SP.POP.AG18.MA.IN'],
          dtype='object')
    
    >>> data.index
    RangeIndex(start=0, stop=2125, step=1)
    >>> 

```        
<a id="org2fe4283"></a>

## Calculating the Income Growth Rate

Following the process we will craft a proxy variable to estimate profitability here is reported how we did that.

```python 
    # Calculating the IGR Income Growth Rate on the GDP per capita : NY.GDP.PCAP.KD.ZG
    # Another useful indicator is GNI per capita growth rate NY.GNP.PCAP.KD.ZG ✓
    indicators=['NY.GDP.PCAP.KD.ZG']
    hic_countries=wb.income.members('HIC')
    start_year=pd.Timestamp.today().year - 25
    data = wb.data.DataFrame(indicators, hic_countries, time=range(start_year, pd.Timestamp.today().year + 1))
    
    # After download 
    #data.info()
    df = data.reset_index().melt(id_vars=['economy'], value_vars=data.columns[1:], var_name='year', value_name='NY.GDP.PCAP.KD.ZG') # Remove the extra .data
    df.info()
    df.head()
    #Extract the numeric year
    df['year'] = df['year'].str.extract(r'(\d{4})').astype(int)
    # Set 'economy' and 'year' as index
    df = df.set_index(['economy', 'year'])
    # Rename the column
    df.columns = ['GDP per Capita %'] 
    print(df)
    
    ####Now dealing with NaN
    print(f"\nNaN values in gdp_per_capita_df['IGR']:\n{df.isnull().sum()}") #the output here shows how much Null, NaN data we have
    
    #### 'GDP per Cap' better interpolate NaNs 
    df['NY.GDP.PCAP.KD.ZG'] = df['NY.GDP.PCAP.KD.ZG'].interpolate(method='linear') # ✓updated to 'GDP per Cap' as proxy for IGR
    
    #### CALCULATING IGR OVER GDP per Capita:
    gdp_per_capita_df=data
    gdp_per_capita_df.info()
    
    ##Calculate the IGR 
    
    gdp_per_capita_df['IGR']=gdp_per_capita_df.groupby('economy')['NY.GDP.PCAP.KD.ZG'].pct_change()
    gdp_per_capita_df['IGR']= gdp_per_capita_df['IGR'].interpolate(method='linear') #did not sorted out NaN data (=85 records)
    gdp_per_capita_df['IGR'].fillna(0, inplace=True)
    
    # Now, this element is clean up to 0 NaN, ready to get integrated into the forecasting_model DS. 
```
Notice despite working on a `0 NaN df (GDP per Capita)` the IGR operation still produces NaN values, in this case <mark>85 NaN records</mark>.
We applied linear interpolation to sort out these entries. 

Linear interpolation assumes that the missing value can be estimated by drawing a straight line between the previous and next available values. Simply filling NaN values with 0 can be considered a more "aggressive" approach, as it implies that the growth rate for the first year of each country is exactly 0, which might not be the case.

However when using interpolate on a column, it only fills NaN values if there are valid values on both sides of the NaN value. If a NaN value is at the beginning or end of the column, it won't be filled. We were haing persistently NaN values, <mark>exactly 85</mark>, here is the reason.

To fix this, we used the fillna method in combination with interpolate. Filling the NaN values at the beginning of the column using a specific value (e.g., 0), and then apply linear interpolation to the rest of the column.

```python     
    gdp_per_capita_df['IGR'] = gdp_per_capita_df['IGR'].fillna(0).interpolate(method='linear')
    print(f"\nNaN values in gdp_per_capita_df['IGR']:\n{gdp_per_capita_df.isnull().sum()}")  # YES!!
    
    gdp_per_capita_df.head()
    data.head() 
    data.info() #
    output='base_model-gdp-igr.csv'
    gdp_per_capita_df.to_csv(output,index=True) # ✓
```

<a id="orgb7db79c"></a>

## Indicators 5,6,17

With the below (new) definition of indicators I did the same process of cleaning and preparation to integrate in my so called base<sub>core</sub> model

    indicators=[series_N_C[5][1],series_N_C[6][1],series_N_C[17][1]] #✓

<a id="org77b8f93"></a>

## Demographic Indicators 0 and 1.

This a very special case in my journey about fetching data and cleaning. Since in these two cases I had to perform operations strictly manually due to different reasons, among them:

-   Networks issues when downloading I think connected with the Data Warehouse
-   Gaps in the content of dataset
-   Forced to follow syntax

```python 
    df= pd.read_csv('raw_download-0-1.csv')
    df.info()
    df.head()
    data.head()
    data.info()
    print(f"\nNaN values in data 0-1.csv:\n{data.isna().sum()}")
    data=data.iloc[: -5]  #to cut off the las 5 rows [important!]
    output="clean_series_N_C-01_series_N_C-02.csv"
    data.to_csv(output,index=True)
```

<a id="orgf346209"></a>
## Merging DataFrame into a base model for forecasting

Avoiding redundancy in this report the following snippet gives us a status report on NaN values before merging. The cleaning is already done in the following group of series so here we are going to focus in the merging columns process. 

```python 
    data_c=pd.read_csv('clean_series_N_C-17-5-6.csv') #loading the 17-5-6.csv and exploring integrate into core-forecasting-to mode
    data_c.head()
    
    print(f"\nNaN values in data series_N_C-17-5-6.csv:\n{data_c.isna().sum()}")
    
    data_c.info()

    df1=pd.read_csv('clean_series_N_C-01_series_N_C-02.csv')
    df2=pd.read_csv('clean_series_N_C-17-5-6.csv')
    df3=pd.read_csv('fo_model-gdp-reo-igr.csv')
    
    df2.info()
    df3.info()
    
    merged_df2_3=df3.join(df2, on=["economy","time"])
    
    print(df2.index)
    
    df2.set_index(['economy','time'], inplace=True) #when loaded above index is reset. 
    df3.set_index(['economy','time'], inplace=True)
    
    
    df_merged_ver01=df2.join(df3)
    
    df_merged_ver01.head() #checking out results
    df_merged_ver01.tail()
    df_merged_ver01.info()
    
    df1.columns
    df1.head()
    # for checking syntax: >>$data=df.drop('Public spending on education, total (% of GDP) [SE.XPD.TOTL.GD.ZS]',axis=1)
    # I proced on a test copy, just in case, and as plan B.
    df1_test2=df1.drop(['Unnamed: 0','Year','Country Name'], axis=1)
    df1_test2.head()
    df1_test=df1.drop(['Unnamed: 0', 'Year', 'Country Name'], axis=1)
    #as I got a test version I'm gonna reuse it for testing changing name cols
    
    # Following the following template for renaming columns from documentation online>> df_final=df_reset.rename(columns={'level_2':'Variable', 0:'Value'})
    df1_test=df1_test.rename(columns={'Year Code':'time', 'Country Code':'economy','Age population, age 18, female [SP.POP.AG18.FE.IN]':'SP.POP.AG18.FE.IN', 'Age population, age 18, male [SP.POP.AG18.MA.IN]':'SP.POP.AG18.MA.IN'})
    
    df1_test.head() # ✓ 
    df1_test.set_index(['economy','time'], inplace=True) #got it!! ✓✓✓✓✓ now merge it to `merged_ver01`
    df1_test.head()
    df1_test2.head()
    df1.head()
    
    #df_merged_ver01=df2.join(df3)
    df_merged_ver02=df_merged_ver01.join(df1_test)
    
    df_merged_ver02.head()
    df_merged_ver02.info()
    ## I got now my great merged model for working my forecasting modelling
    output='core_foremodel.csv'
    df_merged_ver02.to_csv(output, index=True)
```                                   

###  Plotit version 2
After cleaning and get familiar with this particular group of issues, I came up with a new version of the reported about function to plot our data sets and visualise exploratory correlations. Those issues are however minimised after we fix any apparent inconsistency. At that point the following function is the proper tool to improve the flow in the following explorations. With this explanation, let me introduce Plotit_version_2:

```python

def plotit_v2(indicator, countries):  #now, let's test a function for this ✓
    # Filter the DataFrame for only the countries of interest
    df_filtered = data.loc[countries]
    for country in countries:
        # Filter for each country
        country_data = df_filtered.loc[country]
        # Plot each country on the same figure
        plt.plot(country_data.index.get_level_values('time'), country_data[indicator[1]], label=country)
    # Set the title and labels
    plt.title(indicator[1] + ' for {}'.format(', '.join(countries)))
    #plt.xlabel('Time')
    plt.ylabel(indicator[0])
    # Set x-ticks every 5 years
    time_values = df_filtered.index.get_level_values('time').unique()
    plt.xticks(ticks=time_values[::5], labels=time_values[::5])
    # Add a legend, grid, and layout adjustments
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    # Show the plot
    plt.show()

    #Testing, given the below data:
    indicator=series_Name_code[9]
    countries=['USA','GBR','ESP','DEU']
    plotit_v2(indicator, countries) 
```
![](EG.ELC.RNEW.ZS_plotitV2.png)
* serie_N_C[9] plotted by plotitv2


<a id="org1ee0343"></a>
## The Income Growth 2023 Rank to improve visualisation.

Now even with a more concise version, the DataFrame is ready and cleaned but visualisation of 85 'HIC' countries all together is not practical. Now I am after a meaningful criteria to group them, this is the review I could use when at documenting the step:
Though we some options for grouping our data, namely:

- Regional Grouping
- Economic Development Level
- Governance Indicators
- Sectoral Specialization

I find that a kind of ranking over the last year 2023 in our series time could represent some of the criteria above mentioned and also will no force us to give out for extra explorations out of our work sources or doing that will not improve relevance in this target.

In the next block of code I will show how-to I could find a sort of dictionary over the 2023 IGR ranking and use it as criteria for plotting visualisations.
```python 
    #[1] get copy of data with time as column and cleaned from any str combination
    data=pd.read_csv('core_forecasting_model.csv') #model is loaded 
    data_reset=data.reset_index()
    #[2]filter entries, we need the last years'
    data_last_year=data_reset[data_reset['time']==2023]
    #sort IGR in descending order
    data_last_year_sorted=data_last_year.sort_values(by='IGR', ascending=False)
    #make ranks of 5 economies per group @@@@@
    data_last_year_sorted['group']=(data_last_year_sorted.reset_index().index // 5) + 1
    #create a dict k=group, v=country
    data_last_year_sorted.columns # ['group']
    group_dict=data_last_year_sorted.groupby('group')['economy'].apply(list).to_dict()
    group_1=group_dict[1]
    print(len(group_1))
    print(group_1)
    for i in range(1,18):
        group_i= group_dict[i]
        print(f"group {i}: {group_i}")
    output=('coremodel_IGR_rank_2023.csv')
    data_last_year_sorted[['economy','group']].to_csv(output,index=True)
```

<a id="org7979048"></a>
## Visualisation grouped by the last year IGR ranking

Now, we can have a better criteria for plotting.
So far we have been choosing countries by random or with no special consideration than test our snippets. Every time you can see the values for our variable country or countries these were not under any special characteristic. As plotting 85 countries over 25 years series time could be no interesting, now we can select by five last year IGR ranking following the dictionary output by the below for loop.
```python 
     # following the sequence reported above. 
      data_last_year_sorted.set_index(['economy','time'], inplace=True)
      data_last_year_sorted.to_csv(output,index=True)
    
    rank_IGR_2023=[]
    for i in range(1, 18):
        group_i=group_dict[i]
        rank_IGR_2023.append(group_i)
    print(rank_IGR_2023)
    print(rank_IGR_2023[5])
```
<a id="orgade3bfc"></a>
The for loop above will output 17 groups of countries by its 2023 IGR ranking.


<a id="orgdbf0aaa"></a>

# Create a Simple Linear Regression Model

We could draft a simple linear regression model to establish a baseline for predicting profitability. In the sense that we could understand the relationship between the selected features and the target variable.

<a id="org4476557"></a>
## RECAP

As planned above the following is 
```python 
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Assume you have a Pandas DataFrame 'df' with the selected features and target variable
X = df.drop(['target_variable'], axis=1)  # features
y = df['target_variable']  # target variable

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

lr_model = LinearRegression()
lr_model.fit(X_train, y_train)

y_pred = lr_model.predict(X_test)
```
<a id="org589e242"></a>
## Regarding including time when splitting train and test df for documenting purposes.
As scaling data was step regularly involved in this part of the process, and I was having errors outputs persistently I got into suspicious about including the column time in the calculations. A reading online on the question led to me to the following conclusions and proceed to drop time temporally (sic) when scaling: 
Working on profitability forecasting with income, demographics, and social indicators, excluding the 'time' column from scaling seems like the right approach.

Here's a refined justification considering this specific scenario:

- **Interpretability**: When analysing profitability forecasts, it's crucial to understand how the predictions vary over time. Keeping the 'time' feature in its original year format makes it easier to interpret trends and seasonality patterns in profitability.
- **Temporal Relationships**: In forecasting, preserving the natural relationships between time points is essential for capturing temporal dependencies and building accurate models. Scaling the 'time' feature can distort these relationships, potentially hindering the model's ability to learn from past trends and make accurate predictions.
- **Model Suitability**: For profitability forecasting, we might explore models like time series models (e.g., ARIMA, Prophet) or regression models with time-based features. These models often benefit from having the time feature in its original format, as they are designed to handle temporal data and capture its inherent characteristics.

Therefore, in our context, excluding the 'time' column from scaling is likely the best choice to ensure interpretability, maintain temporal relationships, and support the use of appropriate forecasting models.


<a id="org77658b8"></a>

# Evaluate and Refine the model.

<a id="orgea47606"></a>
## The LR application.

```python
#Getting started into the Forecasting stage
# 1. Split Data stage, next: following planning described earlier, we will have our dataframe df into two parts:
# y (target variable): This will be the 'Income Growth Rate' (IGR) column, which is the variable we're trying to predict or forecast.
# X (features): This will be all the other columns in our dataframe, excluding the 'Income Growth Rate' column. These columns will be used as input features to predict the 'Income Growth Rate'.
from sklearn.model_selection import train_test_split
data=pd.read_csv('core_foremodel.csv')
#data loaded 
df=data.reset_index() # before splitting the data reset the index
X = df.drop(['IGR'], axis=1)  # features
y = df['IGR']  # target variable
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# [2] Feature Scaling
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
# Select only numerical columns
# Scale only the numerical columns
# X_train_scaled = scaler.fit_transform(X_train) #ValueError converting string to float 'BEL' so exclude economy, only floats
# X_test_scaled = scaler.transform(X_test)
numerical_cols = X_train.select_dtypes(include=['int64', 'float64']).columns
numerical_cols = numerical_cols.drop('time', errors='ignore') #Exclude 'time'
X_train_scaled = scaler.fit_transform(X_train[numerical_cols])
X_test_scaled = scaler.transform(X_test[numerical_cols])

# [3] Simple Linear Regression
#Create a simple linear regression model using the LinearRegression class from Scikit-learn:
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# [4]
from sklearn.metrics import mean_squared_error, r2_score
y_pred = model.predict(X_test_scaled)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f'MSE: {mse:.2f}, R2: {r2:.2f}') ✓ ##>> MSE: 76.96, R2: -0.03 
```

<a id="org0a5589f"></a>
## Hypothesis Forecasting Model First Version

The hypothesis behind the snippet executed is to evaluate the performance of a regression model using MSE and R² metrics. The goal is to minimize MSE and maximize R².

<a id="orgee31015"></a>
## First Evaluation draft

<mark>MSE: 76.96, R2: -0.03</mark>
<mark>MSE: 76.96</mark>

### MSE (Mean Squared Error) measures the average squared difference between the predicted values and the actual values.

A lower MSE indicates better model performance, as it means the predictions are closer to the true values.
In our case, an `MSE of 76.96` suggests that, on average, the squared difference between our model's predictions and the actual profitability values is 76.96.
The magnitude of the MSE depends on the scale of our target variable (profitability). If profitability values are large, an `MSE of 76.96` might be relatively small. However, if profitability values are small, this MSE could be considered high.

### `R2: -0.03`
`R2 (R-squared)` represents the proportion of variance in the target variable (profitability) that is explained by the model.
`R2` values range from `0 to 1`, with higher values indicating better model fit.
An `R2` of 0 means the model does not explain any variance in the target variable, while an `R2 of 1` means the model perfectly explains all the variance.
`Negative R2` values indicate that the model performs worse than a horizontal line (simply predicting the mean of the target variable). This suggests that your model is not capturing the underlying patterns in the data and is making predictions that are worse than simply using the average profitability as a prediction.

### Overall Interpretation

 Based on the MSE and R2 outcome, it appears that our current model is not performing well in predicting profitability. The high MSE and negative `R2` suggest that the model's predictions are not accurate and do not explain the variability in the target variable.
    
 Possible Reasons for Poor Performance
   - Several factors could contribute to the poor performance:
   - Insufficient Features: The model might not have access to enough relevant features to capture the complex relationships that drive profitability. We will consider adding more features that could be predictive, such as economics type of, though still not clear about details.
   - Model Complexity: The model might be too simple or too complex for the data. 
   - Data Quality: The quality of our data can significantly impact model performance, say the experts, but considering the data set we are working with, we have no options. Though a persistent question that arise in my mind is that our data is not clean, is not consistent, or is not representative of the real-world scenario we are trying to model.
   - Data Preprocessing: The way we preprocess our data, also say the experts, can affect model performance. I still have in my to-do list evaluate what other feature could be of help in this context.
   - Target Variable Distribution: Check the distribution of our target variable (profitability) though I still need to enhance my base knowledge to perform an analysis on the distribution of scores.
    
## Next Steps
    
### Feature engineering, Regarding Estimating `AYS`, Average Years of Schooling

To estimate the average years of schooling, I have learn I can use the literacy rate data as a proxy. One approach is to use a linear transformation to map the literacy rate to average years of schooling. This is based on the assumption that higher literacy rates are associated with higher average years of schooling.
    
The procedure I followed is described below:
  - Define a minimum and maximum average years of schooling for the `HIC` countries. For example, considering 6 years (primary education) as the minimum and 16 years (tertiary education) as the maximum.
  - Use the literacy rate data to estimate the average years of schooling for each country. Also  a linear interpolation formula, such as:
```python
'Average Years of Schooling' = ('Literacy Rate' - 'Min Literacy Rate') / ('Max Literacy Rate' - 'Min Literacy Rate') * ('Max Average Years of Schooling' - 'Min Average Years of Schooling') + 'Min Average Years of Schooling'
```
Where:
```python
`Min Literacy Rate is the minimum literacy rate in our dataset (e.g., 80%)`
`Max Literacy Rate is the maximum literacy rate in our dataset (e.g., 100%)`
`Min Average Years of Schooling is the minimum average years of schooling (e.g., 6 years)`
`Max Average Years of Schooling is the maximum average years of schooling (e.g., 16 years)`
 ```   
For example, if the literacy rate for a country is 90%, the estimated average years of schooling would be:
    
'Average Years of Schooling' = (90 - 80) / (100 - 80) * (16 - 6) + 6 = '12.5 years'

```python     
#####CALCULATING the estimated average years of schooling for each country
#import pandas as pd
# Load the literacy rate data
data=pd.read_csv('core_foremodel.csv') #load data
        
# Define the minimum and maximum average years of schooling
min_average_years_schooling = 6
max_average_years_schooling = 16
        
# Define the minimum and maximum literacy rates
min_literacy_rate = 80
max_literacy_rate = 100
        
# Estimate the average years of schooling for each country
#literacy_rate_data['average_years_schooling'] = (literacy_rate_data['literacy_rate'] - min_literacy_rate) / (max_literacy_rate - min_literacy_rate) * (max_average_years_schooling - min_average_years_schooling) + min_average_years_schooling
        
 data['average_years_schooling'] = (data['SE.ADT.LITR.ZS'] - min_literacy_rate) / (max_literacy_rate - min_literacy_rate) * (max_average_years_schooling - min_average_years_schooling) + min_average_years_schooling
 output=("core_foremodel_ays.csv")
 data.to_csv(output, index=True)
        
 # Print the estimated average years of schooling for each country
 print(literacy_rate_data)
```        

### Feature engineering, Regarding calculating Population Growth Rate


```python         
####calculating population growth rate
data=pd.read_csv('core_foremodel_ays.csv') #load data
data_reseted=data.reset_index() # for making 'economy' as column
data_reseted['population_growth_rate']=data_reseted.groupby('economy')['SP.POP.AG18.FE.IN'].pct_change() + data_reseted.groupby('economy')['SP.POP.AG18.MA.IN'].pct_change()
#######
data_reseted['population_growth_rate'] = (data_reseted.groupby('economy')['SP.POP.AG18.FE.IN'].pct_change() + data_reseted.groupby('economy')['SP.POP.AG18.MA.IN'].pct_change()
                                          )
data_reseted.tail()
#checking NaN in foo[pgr]
print(f"\nNaN values in data_reseted['population_growth_rate']:\n{data_reseted.isnull().sum()}") #yes ✓

data_reseted['population_growth_rate'] = data_reseted['population_growth_rate'].fillna(0).interpolate(method='linear')
output=("core_foremodel_ays_pgr.csv")
back_index_data_reseted=data_reseted.set_index(['economy', 'time'])
back_index_data_reseted.to_csv(output, index=True)
back_index_data_reseted.tail()
```
<a id="orgc3122bf"></a>
## Second Evaluation: Redefine the Profitability Variable

### A New Approach to Profitability.

```python     
#load data, define [profotability] and add it as column, exclude time & economy in the calculation df.
#########[1]Split Train & Test DF

from sklearn.model_selection import train_test_split
data=pd.read_csv('core_foremodel_vpgr_ays.csv') #load as it's, because the `train_test_split` function doesn't work well with multi-indexed dataframes.
df=data
df['profitability'] = (0.4 * df['NY.GDP.PCAP.KD.ZG'] + 
                           0.3 * df['population_growth_rate'] + 
                           0.3 * df['average_years_schooling'])
df.columns
X = df.drop(['profitability'], axis=1)  # features
y = df['profitability']  # target variable
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
#[2]Feature Scaling 
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
numerical_cols = X_train.select_dtypes(include=['int64', 'float64']).columns
numerical_cols = numerical_cols.drop('time', errors='ignore') #Exclude 'time'
X_train_scaled = scaler.fit_transform(X_train[numerical_cols])

X_test_scaled = scaler.transform(X_test[numerical_cols])
#[3]#Create a simple linear regression model using the LinearRegression class from Scikit-learn:
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train_scaled, y_train)
#[4] Evaluate the Model.
from sklearn.metrics import mean_squared_error, r2_score
y_pred = model.predict(X_test_scaled)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f'MSE: {mse:.2f}, R2: {r2:.2f}') ##>> MSE: 0.00, R2: 1.00 ✓
``` 

### Forecasting Profitability Version 2
    
 <mark>print(f'MSE: {mse:.2f}, R2: {r2:.2f}') >> MSE: 0.00, R2: 1.00</mark>
        
  With an <mark>MSE of 0.00</mark> and an <mark>R² of 1.00</mark>, it appears that our model is performing exceptionally well. This suggests that the profitability_score we created is highly correlated with the target variable, and the model is able to predict the values almost perfectly.
        
  However, I have to take this with caution since this might be too good to be true. In real-world scenarios, as I read on it it's rare to achieve an R² of 1.00, especially with complex datasets. There are a few possible explanations for this result:
        
  - Overfitting: Our model might be over-fitting the training data, which means it's memorizing the patterns in the training set rather than learning generalizable relationships. This can happen when the model is too complex or when the training set is too small.
  - Data leakage: There might be some data leakage or information leakage, which means that the model is using information that it shouldn't have access to. This can happen when there are strong correlations between features or when there are errors in data preprocessing.
  - Model bias: Our model might be biased towards a specific subset of the data, which means it's not generalizing well to the entire dataset.
        
  - To verify that our model is indeed performing well, I read I can do the following:
        
    - Validate with additional metrics: Calculate additional metrics, such as mean absolute error (MAE), mean absolute percentage error (MAPE), or cross-validation scores, to get a more comprehensive view of the model's performance.
    - Perform sensitivity analysis: Test the model's sensitivity to changes in the profitability_score or other features to ensure that it's robust and generalizable.
    
### Calculate additional metrics:
    
 `print(f"MAE: {mae:.2f}, MAPE: {mape:.2f}%")  #>>> MAE: 0.00, MAPE: 0.00%`
        
  - The output <mark>MAE: 0.00, MAPE: 0.00%</mark> indicates that the Mean Absolute Error (MAE) and Mean Absolute Percentage Error (MAPE) are both zero.
        
  - `MAE`: The MAE measures the average difference between the predicted and actual values. A MAE of 0.00 means that the model is predicting the values perfectly, with no error.
  - `MAPE`: The MAPE measures the average absolute percentage difference between the predicted and actual values. A MAPE of 0.00% means that the model is predicting the values perfectly, with no error.
  - In both cases, a value of 0.00 is unlikely in real-world scenarios, as it implies that the model is making perfect predictions. This could be due to overfitting, where the model is memorizing the training data rather than learning generalizable patterns.
    
### Cross Validation

```python     
# Perform cross-validation:
# To get a more comprehensive view of our model's performance let's perform cross-validation using the cross_val_score function from scikit-learn.

from sklearn.model_selection import cross_val_score
# Perform cross-validation
scores = cross_val_score(model, X, y, cv=5, scoring='neg_mean_squared_error') #again check numerical in yhe model [??? for check]
print(f"Cross-validation scores: {scores}")
```    

### Permutation Importance

```python 
# Perform permutation importance
results = permutation_importance(model, X_test, y_test, n_repeats=10, random_state=42) #check the columns probably requiere get cleaned from str 

results = permutation_importance(model, X_test_scaled, y_test, n_repeats=10, random_state=42) #check the columns probably requiere get cleaned from str, yes it was, so I updated the X_test argument to 'X_test_scaled'
# Print the feature importances
# for i, feature in enumerate(X_train_scaled.columns):
#     print(f"Feature: {feature}, Importance: {results.importances_mean[i]:.2f}")  I got errors because of str cols & the scaled are a numpy obj which has not cols as callable attribute so I did the following: and worked ✓
for i, feature in enumerate(X_train[numerical_cols]):
print(f"Feature: {feature}, Importance: {results.importances_mean[i]:.2f}")    

#X_train[numerical_cols] ✓ adjustment to numerical cols worked ✓
# Feature: IC.BUS.EASE.XQ, Importance: 0.00
# Feature: SE.ADT.LITR.ZS, Importance: 0.01
# Feature: SE.XPD.TOTL.GB.ZS, Importance: 0.00
# Feature: EG.ELC.RNEW.ZS, Importance: 0.00
# Feature: NY.GDP.PCAP.KD.ZG, Importance: 1.87
# Feature: IGR, Importance: 0.00
# Feature: SP.POP.AG18.FE.IN, Importance: 0.00
# Feature: SP.POP.AG18.MA.IN, Importance: 0.00
# Feature: population_growth_rate, Importance: 0.00
# Feature: average_years_schooling, Importance: 0.06
```    

### Cross Validation.

```python     
########let's change to CROSS VALIDATION==> score is low, so probably overfitting
from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='neg_mean_squared_error')
print("Cross-validated MSE:", -scores.mean()) ## >>Cross-validated MSE: 6.037135106312907e-30
```    
### Lasso Cross Validation
    
```python 
###########Cross-validation for Tuning: Lasso’s effectiveness depends on choosing an optimal value for the regularization parameter (alpha). You can use cross-validation to find the best alpha value:
from sklearn.linear_model import LassoCV

# Lasso with cross-validation to find the best alpha
lasso_cv = LassoCV(cv=5, random_state=42)
lasso_cv.fit(X_train_scaled, y_train)

# Best alpha
print("Best alpha value:", lasso_cv.alpha_) ##>>>Best alpha value: 0.002646718409366376

# Check cross-validated performance
scores = cross_val_score(lasso_cv, X_train_scaled, y_train, cv=5, scoring='neg_mean_squared_error')
print("Cross-validated MSE (Lasso):", -scores.mean()) #>>>Cross-validated MSE (Lasso): 2.3839075020207653e-05

####It's said I can check the coefficient(produced by Lasso at this optimal alpha value 0.0026) as follows and features with coefficients shrunk to zero can be considered irrelevant, this could allow us to remove them in future iterations to simplify the model.
print(lasso_cv.coef_)
coeffsl=lasso_cv.coef_.tolist()
print(coeffsl)
# 10 scores >>>[0.0, 0.6187933033262154, -0.0, -0.0, 2.6704704544272584, 0.0, 0.0, 0.0, 0.021555208976863763, 0.09794048105961742]

# to also print corespondences
# Assuming feature names are in a list called 'numerical_cols'
# numerical_cols = ['IC.BUS.EASE.XQ', 'SE.ADT.LITR.ZS', 'SE.XPD.TOTL.GB.ZS',
                                      #                   'EG.ELC.RNEW.ZS', 'NY.GDP.PCAP.KD.ZG', 'IGR', 'SP.POP.AG18.FE.IN',
                                      #                   'SP.POP.AG18.MA.IN', 'population_growth_rate', 'average_years_schooling']
numerical_cols  #this is for print them
# Get the coefficients from Lasso model
lasso_coefficients = lasso_cv.coef_
# Zip together feature names and coefficients, and print
for feature, coef in zip(numerical_cols, lasso_coefficients):
print(f"Feature: {feature}, Coefficient: {coef}")
#>>>>> output:
# Feature: IC.BUS.EASE.XQ, Coefficient: 0.0
# Feature: SE.ADT.LITR.ZS, Coefficient: 0.6187933033262154
# Feature: SE.XPD.TOTL.GB.ZS, Coefficient: -0.0
# Feature: EG.ELC.RNEW.ZS, Coefficient: -0.0
# Feature: NY.GDP.PCAP.KD.ZG, Coefficient: 2.6704704544272584
# Feature: IGR, Coefficient: 0.0
# Feature: SP.POP.AG18.FE.IN, Coefficient: 0.0
# Feature: SP.POP.AG18.MA.IN, Coefficient: 0.0
# Feature: population_growth_rate, Coefficient: 0.021555208976863763
# Feature: average_years_schooling, Coefficient: 0.09794048105961742
```    
### The Important Features.
    
```python            
#####dropping the irrelevant features 
important_features = ['SE.ADT.LITR.ZS', 'NY.GDP.PCAP.KD.ZG', 'population_growth_rate', 'average_years_schooling']
X_train[important_features] #✓ 
#X_train_reduced = X_train_scaled[important_features] #this gives error as X_test_scaled is a numpy obj. no cols features included, so.. check line 1186
X_train_reduced=scaler.fit_transform(X_train[important_features]) #scaling again including only iportant features after applying better coefficients.
X_test_reduced =scaler.transform(X_test[important_features])
####now training the model on the 4 important features:
model.fit(X_train_reduced, y_train)
y_pred=model.predict(X_test_reduced)
######Re-evaluate the model on the reduced df
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f'MSE: {mse:.2f}, R2: {r2:.2f}') #>>>> MSE: 0.00, R2: 1.00
```

<a id="org25402c3"></a>

## Forecast Profitability.

After applying corrections we are still getting perfect metrics <mark>`MSE: 0.00 and R2: 1.00`</mark> which strongly suggests that the model is overfitting, even after reducing features and applying Lasso Regression.


### 1. Overfitting Implications:

The fact that we are consistently getting perfect or near-perfect metrics, even after regularizing with Lasso and reducing the feature set, indicates that our model is likely memorizing the training data rather than generalizing.
This could be due, it's said, to the simplicity of our dataset, the relatively small number of samples, or high correlations between your features and the target variable.


### 2. Design Limitations

Here is where I start to feel we have a design matter. Probably the model is too simple (I was just doing an exercise to understand these concepts). I had a set of data on HIC countries for the last 25 years with the indicators described above and I wanted to evaluate the profitability (for example to forecast new investments). So for that purpose, I estimated a new indicator 'IGR' (Income Growth Rate) on 'GDP per capita' and in a feature engineering attempt I estimated 'population_growth_rate' (on 'SP.POP.AG18.FE.IN' and 'SP.POP.AG18.MA.IN') and 'average_years_schooling' (on 'SE.ADT.LITR.ZS') and tried some LR modelling to see if I could build a prediction game artefact on top of all that. Here is a short list of options:

#### We can increase Cross-Validation:

 Try increasing the number of cross-validation folds to see if it catches any variation between training and testing. For example, you could try using 10-fold cross-validation:

#### Wonder ourselves about Data Quality, or Quantity or Diversity:

 Quantity of Data: If our dataset is small or not diverse enough, the model might easily fit it perfectly. Adding more samples (if possible) or introducing noise through regularisation or data augmentation could help.

#### Data Leakage:

How to ensure ourselves that there isn’t hidden data leakage, where information from the target variable or future values is inadvertently used in training. On this topic not always explained it plenty of examples, the technique instructs about scaling or performing other transformations made on entries of data that this is done after splitting it into training and data sets. In our case we did for not reusing variables but creating news on the previous so that the new calculations work on new entirely entities. Also that scaling and feature selection are done only on training data (before test data is exposed).

#### Threre are other range of corrections such as Regularization (ElasticNet), that I need to get documented about.
 Which combines Lasso (L1) and Ridge (L2) regularization. This might add a stronger penalty and provide a better
  trade-off for fitting but in my current opinion overstretches the purpose of this study. 


<a id="org4b2ed5d"></a>

# Consideration of legislation, regulation, industry and organisational policies, procedures and requirements

This exercise has brought me into close contact with aspects of the analysis of economic and social factors which at first sight appear to be almost cause and almost effect, but in practice this uncertainty becomes exponential in its effects. The real task about profitability is its unpredictability, the lot od unseen factors.
While some factors that affect profitability can be easily tracked and measured, such as GDP growth rate and average years of schooling, there are other aspects that are more elusive and difficult to capture. These factors can be thought of as "unseen" or "hidden" variables that can have a significant impact on profitability, but are not easily quantifiable.


<a id="orgd8559a4"></a>

# Analysis


<a id="org193da38"></a>

## Modelling, a first version

To calculate the income growth rate, I found I could follow the following formula:

`Income Growth Rate = (Current Year's Value - Previous Year's Value) / Previous Year's Value`

For example, using the GDP per capita growth rate dataset, we can calculate the income growth rate as:
`Income Growth Rate = (Current Year's GDP per capita - Previous Year's GDP per capita) / Previous Year's GDP per capita`

Once we've calculated the income growth rate, we can add it to our DataFrame as a new column.


<a id="orgd3c75db"></a>

## Feature Engineering

The idea behind crafting features like 'population growth rate', as detailed in the respective section earlier, and 'average years of schooling' is approaching the demographic and human development aspects of a country that can impact its economic growth and profitability.

Population growth rate involves a country's potential for economic growth, as a growing population can lead to an increase in the workforce, consumer demand, and overall economic activity.

On the other hand, average years of schooling is a measure of a country's potential, human capital, which is essential for driving innovation, productivity, and economic growth.

For example, a country with a high population growth rate and high average years of schooling may be more likely to experience economic growth and increased profitability, as it has a large and educated workforce that can drive innovation and productivity, that is the main idea behind these decisions.


<a id="org4138c60"></a>

## After applying Sensitivity Analysis


### Details on Cross Validation, first, why, how-to and results

The plan behind the cross validation was re-check how about each feature of the set of indicators was contributing to the final score and exhaust the model as designed to capture profitability correlations with certain conditions or measurement. The null hypothesis is always a strong possibility but in this case there are some guess-based assumptions that is necessary evaluate at least initially.


### Lasso Regression correction and final results

(which also connect to the limits of the current design).
Lasso Regression is acronym for Least Absolute Shrinkage and Selection Operator, and indeed, is a technique used to evaluate the performance of a model, particularly when the model is not strongly founded or when there are concerns about over-fitting.

The Lasso validation is a way to assess the model's performance by evaluating its ability to predict the target variable using a subset of the features.

The Lasso validation works by iteratively removing features from the model and evaluating its performance. This process helps to identify the most important features that contribute to the model's predictions. That is how we ended up, as seen detailed in the correspondent section, with a four features model, the so called `important_features = ['SE.ADT.LITR.ZS', 'NY.GDP.PCAP.KD.ZG', 'population_growth_rate', 'average_years_schooling']`

Reduce overfitting: By removing features that are not contributing to the model's predictions, the Lasso validation can help to reduce overfitting and improve the model's generalization capabilities.

Identify key features: The Lasso validation can help to identify the most important features that drive the model's predictions, which can provide insights into the underlying relationships between the features and the target variable.
Evaluate model robustness: The Lasso validation can help to evaluate the model's robustness by assessing its performance under different scenarios, such as when features are removed or when the model is trained on different datasets.

This analysis, is key since it leads us to a improved model, this is a data frame on the features that was given relevant wight in the testing metrics before applying the model to unseen data or new locations.


<a id="org15727c7"></a>

## A simplified Model

Dropping the features with a coefficient of ****0.0**** (or very close to zero), we'd be simplifying our model to focus only on the ****4 indicators**** that Lasso has determined to be most impactful for predicting profitability. These are the features that truly contribute to our target variable (`profitability`), while the others are not adding meaningful information and can be safely excluded.


### Features to Keep Based on Results:

From the Lasso output obtained, the non-zero features and their coefficients are:

1.  ****SE.ADT.LITR.ZS (Coefficient: 0.6188)**** – Literacy rate.
2.  ****NY.GDP.PCAP.KD.ZG (Coefficient: 2.6705)**** – GDP growth rate.
3.  ****population_growth_rate (Coefficient: 0.0216)**** – Population growth rate.
4.  ****average_schooling (Coefficient: 0.0979)**** – Average years of schooling.

These four features will form the core of our model. In connection with metrics obtained, the plan was apply this streamlined model to ****unseen locations**** to assess profitability, as in theory this approach would be focused on the features that provide the most predictive power.


### Benefits of Reducing Features:

1.  ****Better Generalization****: A simpler model with fewer features is less prone to overfitting and should generalize better to unseen data.
2.  ****Easier Interpretability****: With only 4 indicators, it's much easier to interpret the model and explain how these features drive the profitability predictions.
3.  ****Application to New Data****: We could now apply this model to new data from other locations with these same 4 indicators to predict profitability.


### Steps to Implement:

1.  ****Drop the irrelevant features**** (those with coefficients of 0.0) from your dataset:

```python
important_features = ['SE.ADT.LITR.ZS', 'NY.GDP.PCAP.KD.ZG', 'population_growth_rate', 'average_years_schooling']
X_reduced = X_train_scaled[important_features]
X_reduced = X_test_scaled[important_features]
```

![](X_train[important_features].png)
*fig Metrics for *[important_features]

2.  ****Retrain the Model**** using only the 4 features:
```python
model.fit(X_train_reduced, y_train)   
```
3.  ****Test on Unseen Data****: Once the model is retrained with the reduced feature set, you can assess its performance on unseen data using the same 4 indicators.

In theory this streamlined approach should give us a more robust and interpretable model for assessing profitability across different locations or datasets. 

<a id="orgb230e15"></a>

# Insights

The main discovery in the sense of data based discovery let me the remark is on how forecasting investment could convey no linear relationship between variables.

Examples of these unseen factors might include and are not included in the dataset of this exercise are:

-   Social and cultural trends: Changes in consumer behavior, social norms, and cultural values can affect demand for certain products or services, making it difficult to predict profitability.
-   Regulatory and policy changes: Unexpected changes in government regulations or policies can impact profitability, especially if they affect the cost of production, taxation, or market access.
-   Technological disruptions: The emergence of new technologies can disrupt entire industries, making it challenging to predict profitability in the face of rapid change.
-   Environmental and climate-related factors: Natural disasters, climate change, and environmental degradation can impact profitability, especially for companies that rely on natural resources or have significant environmental liabilities.


<a id="org07dbda6"></a>

# Recommendations and conclusions

The clear conclusion I can draw is that there are indeed more complex aspects to consider (inflation, interest rates, etc.) and non-linear dynamics beyond the model, at least as designed; however, this was a first approximation of its complexity and I believe that by recognising the complexity in this particularly unpredictable performance, investors and I as an observer can develop more informed and resilient investment strategies and methodologies that take into account the unseen factors that can affect returns.

