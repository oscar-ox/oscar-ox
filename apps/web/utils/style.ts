export function JoinClassNames (...classes: (false | null | undefined | string)[]) {
    return classes.filter(Boolean).join(" ");
}
