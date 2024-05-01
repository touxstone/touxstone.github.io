# Data Structures
- by SM NCC@19161671

If I were to present to a non-technical audience the necessary elements we deal with as data analysts when evaluating data-driven decisions to improve assertiveness and consistency, the business and decision makers' dreamland, one of the first components is grouped under the generic heading of data structures. It is our so-called object in the process, and it should contain the elements we have or we should to consider in order to make a procedure that we can reuse so that making of it a tool that we could apply to different similar situations or escalate to attend new problems. Here is the draft of ideas I would follow to make an easy figure of our topic. 

Let's first identify the different constructs that we'll be working with. Think of data structures as building blocks that we use to create logical groupings of information. We have arrays, which are like a row of boxes that we can fill with data. Then there are linked lists, which are like a chain of blocks that are connected together. Finally, we have trees, which are like a family tree with a root node and branches that lead to other nodes. But we should mention that these are our second generation of blocks or object-composites since the atomic content as we saw in the [previous entry](https://touxstone.github.io/NCC/2023_24/Cl-DataLifeCycle_mm.html) are numeric digits, integers, real or floating numbers, and letter characters which in turn are the elements of the so-called character strings and or the digital name we have for words, all of which we should identify in our description as **data types**. 

But we must identify this relationship, data type vs data structures, because from the point of view of data entry practice, these mentioned data structures are also marked as [**abstract-data-types**](https://en.wikipedia.org/wiki/Abstract_data_type#Common_ADTs) especially because seen in this way we have a set of combinatorial possibilities, the basic ones, beyond the classical lists, and arrays, start with linked lists and following as already mentioned, by trees, stacks, queues, graph, hash tables. 

The cornerstone of this type of construct is also two complete scientific practices, **access** and the **operations necessary to enter and retrieve** information. Among the familiar ones are e.g. the **FIFO** approach for stacks, or **LIFO** for queues.  

Yet all these, being composite forms, are still the basic ones or of the range of the known blocks, but once understood as abstractions in the sense of object planes, we can create customised others. In fact, when we create a class, at least in the Java and Python programming languages, we are essentially creating a new data type, so when we ask the compiler, in their respective syntaxes, for the type of element giving the name of the class as an argument, the compiler will check and confirm whether or not we have a data type, the data type of the class we have just created. 

```Java
// If you have a class named Car and you create an object as:

Car myCar = new Car();

// The Java compiler understand the type of that object as the class name
```
