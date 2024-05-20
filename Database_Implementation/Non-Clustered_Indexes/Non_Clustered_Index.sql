CREATE NONCLUSTERED INDEX IDX_Store_Location ON Store(City, Country);
 
CREATE NONCLUSTERED INDEX IDX_Car_CategoryStore ON Car(CategoryID, StoreID);
