# A Modest music knowledge graph

The goal of this repository is to gather all that there is to know about music in a curriculum.

The curriculum is made of the following elements:

## Sessions
The most atomic element. It represents something that a student is expected to finish in one sitting, without major interruptions. It can be as small as needed but should not be big enough to require multiple sessions to complete.

## Modules
A module is a sequence of related sessions that are finished in order. It can be as short as a single session, but shouldn't become so large that it cannot be expressed linearly, or contain sessions that are unrelated to each other. It should focus on a single specific subject.

Think of modules as the natural grouping of sessions, if sessions are completed in one sitting, a module is completed in an uninterrupted period of time, modules are thought so that you complete without a period of time too long goes by in the middle, in a session if you drop the session at the mid, you;ll probably need to start over, in a module, if you drop the module at half for 6 months, you may need to start over.

Modules have **requirements**, meaning that together, modules form a Directed Acyclic Graph (DAG), the goal is to enable tools that present the user with this graph and allow the user to understand what part of the graph they have covered, and understand how they can mode on.   

## Proficiencies
Modules have proficiencies. A proficiency represents the gap between knowledge and practice, or the time required to develop a skill. It's essentially a declaration of what skill levels the user can develop by learning that module.

For example, a module might teach a student how to read the notes **C, D, and E**. For a module as simple as that, we could have two levels of proficiency:

* **Level 1**: The student can play the notes C, D, and E when presented in the form of a ladder (step-wise motion) between each other, without jumping directly from C to E.
* **Level 2**: Level 1 + including jumps (intervals like C to E).

While this is a deceptively simple example, the point is that a proficiency is a sequence of measurable skill descriptions that can be developed linearly.

## Skills
Modules can be logically grouped into **skills**. Skills are collections of modules related to each other that allow the user to attain a specific overarching capability. They are a somewhat arbitrary grouping; they do not contain knowledge directly, but instead aggregate a subset of interrelated modules.

Skills also contain **proficiencies**, which allow us to declare the gap between acquiring a set of theoretical knowledge and consistently demonstrating skills over that learned content.

## The Learning Graph
By combining these structural elements (Sessions, Modules, Skills, and Proficiencies), we can form an arbitrarily complex **Learning Graph**. 

We can use AI to evaluate the progress of students as they navigate this graph. This enables a highly optimized, low-cost educational process where students can fully own and customize their learning development path.
