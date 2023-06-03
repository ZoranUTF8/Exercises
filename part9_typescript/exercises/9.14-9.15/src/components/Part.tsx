import { PartProps } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ partData }: PartProps) => {

    switch (partData.kind) {
        case "basic":
            return (
                <div>
                    <strong>{partData.name}</strong>
                    <p>Exercise count: {partData.exerciseCount}</p>
                    {partData.description && <p>Description: {partData.description}</p>}
                </div>
            );
        case "group":
            return (
                <div>
                    <strong>{partData.name}</strong>
                    <p>Exercise count: {partData.exerciseCount}</p>
                    <p>Group project count: {partData.groupProjectCount}</p>
                </div>
            );

        case "background":
            return (
                <div>
                    <strong>{partData.name}</strong>
                    <p>Exercise count: {partData.exerciseCount}</p>
                    {partData.description && <p>Description: {partData.description}</p>}
                    <p>Background material: {partData.backgroundMaterial}</p>
                </div>
            );
        case "special":
            return (
                <div>
                    <strong>{partData.name}</strong>
                    <p>Exercise count: {partData.exerciseCount}</p>
                    {partData.description && <p>Description: {partData.description}</p>}
                    <p>Requirements: <ul>{partData.requirements.map((req, ind) => <li key={ind}>{req}</li>)}</ul></p>
                </div>
            );
        default:
            return assertNever(partData);
    }
}

export default Part