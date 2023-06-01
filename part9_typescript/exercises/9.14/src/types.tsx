export interface HeaderProps {
    name: string;
}

export interface CoursePart {
    name: string;
    exerciseCount: number;
}

export interface ContentProps {
    courseParts: CoursePart[];
}


/*

Besides the attributes that are found in the various course parts,
we have now introduced an additional attribute called kind that has
a literal type, it is a "hard coded" string, distinct for each course part.
We shall soon see where the attribute kind is used!
*/
interface CoursePartBasic {
    name: string;
    exerciseCount: number;
    description: string;
    kind: "basic"
}

interface CoursePartGroup {
    name: string;
    exerciseCount: number;
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground {
    name: string;
    exerciseCount: number;
    description: string;
    backgroundMaterial: string;
    kind: "background"
}

/*

Next, we will create a type union of all these types. We can then use it to define a type for our array,|
which should accept any of these course part types:
*/

export type CoursePartUnion = CoursePartBasic | CoursePartGroup | CoursePartBackground;
