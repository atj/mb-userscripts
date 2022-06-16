/**
 * Array utility functions.
 */

// Most of these are provided by other libraries like lodash, but it's less
// bundled code if we write it ourselves.

export function filterNonNull<T>(array: Array<T | null | undefined>): T[] {
    return array.filter((element) =>
        !(element === null || typeof element === 'undefined')) as T[];
}


export function findRight<T>(array: T[], predicate: (elmt: T) => boolean): T | null {
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i])) return array[i];
    }

    return null;
}

export function groupBy<T, K, V>(array: T[], keyFn: (el: T) => K, valTransform: (el: T) => V): Map<K, V[]> {
    const map = new Map<K, V[]>();
    for (const el of array) {
        const k = keyFn(el);
        const v = valTransform(el);

        if (map.has(k)) map.get(k)?.push(v);
        else (map.set(k, [v]));
    }

    return map;
}

/**
 * Sort an array of strings using `Intl.Collator`. Array is modified in-place,
 * and returned.
 */
export function collatedSort(array: string[]): string[] {
    const coll = new Intl.Collator('en', { numeric: true });
    return array.sort(coll.compare.bind(coll));
}

export function enumerate<T>(array: T[]): Array<[T, number]> {
    return array.map((el, idx) => [el, idx]);
}

export function splitChunks<T>(arr: readonly T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }

    return chunks;
}

/**
 * Create an array wherein a given element is inserted between every two
 * consecutive elements of the original array.
 *
 * Example:
 *  insertBetween([1,2,3], 0) // => [1, 0, 2, 0, 3]
 *  insertBetween([1], 0)  // => [1]
 *
 * @param      {readonly T1[]}   arr         The original array.
 * @param      {T2}              newElement  The element to insert.
 * @return     {(Array<T1|T2>)}  Resulting array.
 */
export function insertBetween<T1, T2>(arr: readonly T1[], newElement: T2): Array<T1 | T2> {
    return [
        ...arr.slice(0, 1),
        ...arr.slice(1).flatMap((elmt) => [newElement, elmt]),
    ];
}
