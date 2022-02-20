// Создает virtual node (но не монтирует)
function h(tag, props, children) {
    return {
        tag: tag,
        props: props,
        children: children
    };
}

// Монтирует virtual node из функции h() в DOM дерево
function mount(vnode, container) {
    const e = document.createElement(vnode.tag);
    for (const key in vnode.props) {
        e.setAttribute(key, vnode.props[key]);
    }

    if (typeof vnode.children === "string") {
        e.textContent = vnode.children;
    } else {
        vnode.children.forEach((ch) => {
            mount(ch, e);
        });
    }

    container.appendChild(e);

    vnode.$e = e;
}

// Размонтирует vnode из DOM дерева
function unmount(vnode) {
    vnode.$e.parentNode.removeChild(vnode.$e);
}

// Ищет разницу между двумя нодами
function patch(fn, sn) {
    // Отличающиеся теги
    if (fn.tag !== sn.tag) {
        mount(sn, fn.$e.parentNode);
        unmount(fn);
    } else {
        // Отличающиеся свойства
        sn.$e = fn.$e;
        if (typeof sn.children === "string") {
            sn.$e.textContent = sn.children;
        } else {
            while (sn.$e.attributes.length > 0) {
                sn.$e.removeAttribute(sn.$e.attributes[0].name);
            }

            for (const key in sn.props) {
                sn.$e.setAttribute(key, sn.props[key]);
            }

            if (typeof fn.children === "string") {
                sn.$e.textContent = null;
                sn.children.forEach((ch) => {
                    mount(ch, sn.$e);
                })
            } else {
                const commonLength = (fn.children.length, sn.children.length);

                for (let i = 0; i < commonLength; i++) {
                    patch(fn.children[i], sn.children[i]);
                }

                if (fn.children.length > sn.children.length) {
                    fn.children.slice(sn.children.length).forEach((ch) => {
                        unmount(ch);
                    })
                }

                if (fn.children.length < sn.children.length) {
                    sn.children.slice(fn.children.length).forEach((ch) => {
                        mount(ch);
                    })
                }
            }
        }
    }
}
