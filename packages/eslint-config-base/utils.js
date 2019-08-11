function isObjectLiteral(value) {
    return typeof value === 'object' && !Array.isArray(value);
}

exports.amendRule = (base, override) => {
    if (!override) return base;

    let overwritten;

    if (typeof base === 'string') {
        if (Array.isArray(override)) {
            overwritten = override;
            if (!override[0]) {
                overwritten[0] = base;
            }
        }
        overwritten = override;
    } else if (isObjectLiteral(base)) {
        overwritten = { ...base, ...override };
    } else if (Array.isArray(base)) {
        if (typeof base !== typeof override) return override;

        overwritten = base.map((element, index) => {
            if (!override[index]) {
                return element;
            }

            if (element !== null && isObjectLiteral(element)) {
                return { ...element, ...override[index] };
            }

            return override[index];
        });

        if (override.length > base.length) {
            overwritten.push(...override.slice(base.length));
        }
    }

    return overwritten;
};
