# WEEL
**OBEY THE WEEL**

![image](https://user-images.githubusercontent.com/2119926/138565414-69305529-b89f-4c29-bc0f-883fe15e0cd5.png)

## How to use

1. Clone the repository
2. Open the `script.js` file
3. On line 6 enter slices for the weel, examples are provided by default.
   - The default slices in the file can be edited/removed at will.
   - See the "Slice format" section below for an explanation of how to add slices.
   - The default slices are sized based on the day of the week, so the "Take a drink" slices become larger towards Friday
5. Open the `index.html` in a browser
6. Hold the "SPIN" button down and release to spin the WEEL

### Slice format
Each slice is a Javascript object structured like this:
```
{
    text: "Slice Name", // Displayed text in the WEEL's slice
    color: "#ff3fac", // Color of the slice
    size: 25, // Relative size of the slice. Can be any number, they don't have to add up to 100.
}
```
