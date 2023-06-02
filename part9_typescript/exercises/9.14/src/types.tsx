export interface HeaderProps {
    name: string;
}



/*

Besides the attributes that are found in the various course parts,
we have now introduced an additional attribute called kind that has
a literal type, it is a "hard coded" string, distinct for each course part.
We shall soon see where the attribute kind is used!
*/


export interface ContentProps {
    courseParts: CoursePartUnion[];
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: "background"
}



/*

Next, we will create a type union of all these types. We can then use it to define a type for our array,|
which should accept any of these course part types:
*/

export type CoursePartUnion = CoursePartBasic | CoursePartGroup | CoursePartBackground;
