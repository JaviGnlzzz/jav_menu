---Menu

function CreateNewMenu(title, items, cb)

    if (menu.open) then
        Menu(false)
        Wait(200)
    end

    Menu(true, {
        title = title,
        items = items
    })

    menu.currentCallback = cb
end

function Menu(state, data, w)
    SetNuiFocus(state)
    SetNuiFocusKeepInput(state)

    SendNUIMessage({
        type = 'menu:'..(state and 'show' or 'hide'),
        data = data or {}
    })

    menu.open = state

    if (not state) then menu.currentCallback = nil end
end

---Dialog

function CreateNewDialog(title, type, cb)

    if (menu.dialog.open) then Dialog(false) return end

    Dialog(true, {
        title = title,
        type = type
    })

    menu.dialog.activeCallback = cb
end

function Dialog(state, data)
    if (menu.open) then
        menu.dialog.open = state

        SetNuiFocusKeepInput(not state)
        SetNuiFocus(true, state)

        SendNUIMessage({
            type = 'dialog:'.. (state and 'show' or 'hide'),
            data = data or {}
        })

        if (not state) then menu.dialog.activeCallback = nil end
    end
end

---HandleSelectItem

function HandleSelectItem(data)
    if (data.item.value == 'close') then
        if (menu.currentCallback) then
            menu.currentCallback('close')
            Menu(false)
            return
        end
    elseif (menu.currentCallback) then
        menu.currentCallback(data.item)
    end
end