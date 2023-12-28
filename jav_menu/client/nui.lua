RegisterNUICallback('dialogValueSelected', function(data)
    local callback, value, type = menu.dialog.activeCallback, data.value, data.type

    if (callback) then
        value = (type == 'number') and tonumber(value) or tostring(value)

        if (value) then callback(value); Dialog(false) end
    end
end)

RegisterNUICallback('menuItemSelected', HandleSelectItem)

RegisterNUICallback('hideDialog', function()
    Dialog(false)
end)