exports.amendRule = (base, override) => {
    if (!override || typeof base !== typeof override) return base;

    let overwritten;

    if (typeof base === 'string') {
        overwritten = override;
    } else if (typeof base === 'object' && !Array.isArray(base)) {
        overwritten = Object.assign({}, base, override);
    } else if (Array.isArray(base)) {
        overwritten = base.map((element, index) => {
            if (!override[index]) {
                return element;
            }

            if (
                element !== null &&
                typeof element === 'object' &&
                !Array.isArray(element)
            ) {
                return Object.assign({}, element, override[index]);
            }

            return override[index];
        });

        if (override.length > base.length) {
            overwritten.push(...override.slice(base.length));
        }
    }

    return overwritten;
};
