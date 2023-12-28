const app = new Vue({
    el: '#app',
    data() {
        return {
            menu: {
                open: false,
                dialog: { open: false, title: '', type: null, value: '' },
                title: null,
                index: 0,
                items: []
            }
        };
    },
    methods: {
        scrollMenuItems(deltaY) {
            if (this.menu.items.length === 0) return;

            const container = document.querySelector('.menu-items');
            const scrollAudio = new Audio('./assets/sounds/scroll.mp3');
            scrollAudio.volume = 0.25;

            if (deltaY > 0) {
                const newIndex = this.menu.index + 1;
                this.menu.index = newIndex >= this.menu.items.length ? this.menu.items.length - 1 : newIndex;
                scrollAudio.play();
            } else if (deltaY < 0) {
                const newIndex = this.menu.index - 1;
                this.menu.index = newIndex < 0 ? 0 : newIndex;
                scrollAudio.play();
            }

            const targetItem = container.querySelector(`.item:nth-child(${this.menu.index + 1})`);
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },

        post(url, data, cb) {
            $.post(`https://${GetParentResourceName()}/${url}`, JSON.stringify(data) || JSON.stringify({}), cb || function () { });
        },

        handleMessage(event) {
            const { type, data } = event.data;

            switch (type) {
                case 'menu:show':
                    this.menu.index = 0;
                    this.menu.open = true;
                    this.menu.title = data.title;
                    this.menu.items = data.items;
                    break;
                case 'menu:hide':
                    this.menu.open = false;
                    break;
                case 'dialog:show':
                    if (this.menu.open) {
                        this.menu.dialog.open = true;
                        this.menu.dialog.type = data.type;
                        this.menu.dialog.title = data.title;
                        const dialogInput = document.querySelector('.dialog-input');
                        if (dialogInput) {
                            dialogInput.focus();
                        }
                    }
                    break;
                case 'dialog:hide':
                    if (this.menu.open) {
                        this.menu.dialog.open = false;
                        this.menu.dialog.value = null;
                    }
                    break;
                default:
                    break;
            }
        },

        handleKeyDown(e) {
            if (this.menu.dialog.open) {
                if (e.key === 'Enter') {
                    this.post('dialogValueSelected', { value: this.menu.dialog.value, type: this.menu.dialog.type });
                }

                if (e.key === 'Escape') {
                    this.post('hideDialog');
                }
            } else {
                if (e.key === 'Enter') {
                    const itemSelected = this.menu.items[this.menu.index];
                    if (!itemSelected.value) return;

                    const selectIcon = document.querySelector('.item-option i');
                    if (itemSelected && selectIcon) {
                        selectIcon.classList.add('click');
                        this.post('menuItemSelected', { item: itemSelected });

                        const selectAudio = new Audio('./assets/sounds/select.wav');
                        selectAudio.volume = 0.5;
                        selectAudio.play();

                        setTimeout(() => {
                            selectIcon.classList.remove('click');
                        }, 250);
                    }
                }
            }
        },

        handleMouseDown(e) {
            if (e.button === 0) {
                if (!this.menu.dialog.open) {
                    const itemSelected = this.menu.items[this.menu.index];
                    if (!itemSelected.value) return;

                    const selectIcon = document.querySelector('.item-option i');
                    if (itemSelected && selectIcon) {
                        selectIcon.classList.add('click');
                        this.post('menuItemSelected', { item: itemSelected });

                        const selectAudio = new Audio('./assets/sounds/select.wav');
                        selectAudio.volume = 0.5;
                        selectAudio.play();

                        setTimeout(() => {
                            selectIcon.classList.remove('click');
                        }, 250);
                    }
                }
            } else if (e.button === 2) {
                if (!this.menu.dialog.open) {
                    this.post('menuItemSelected', { item: { value: 'close' } });
                } else {
                    this.post('hideDialog');
                }
            }
        }
    },

    mounted() {
        const options = { passive: false };
        let isScrolling = false;

        document.addEventListener('wheel', (e) => {
            if (!this.menu.dialog.open) {
                if (!isScrolling) {
                    isScrolling = true;
                    this.scrollMenuItems(e.deltaY);

                    setTimeout(() => {
                        isScrolling = false;
                    }, 50);
                }
            }
        }, options);

        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('message', this.handleMessage);
    }
});
