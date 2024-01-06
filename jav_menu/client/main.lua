menu = {
    open = false,
    dialog = {
        open = false,
        activeCallback = nil,
    },
    currentCallback = nil,
    controls = { 6, 14, 15, 16, 17, 18, 24, 25, 27, 50, 68, 69, 70, 91, 92, 96, 97, 99, 106, 114, 115, 122, 135, 142, 144, 176, 177, 180, 181, 198, 222, 223, 229, 237, 238, 241, 242, 257, 261, 262, 329, 330, 331, 334, 335, 336, 346, 348, 347 }
}

CreateThread(function()
    while true do
        local time = menu.open and (IsPauseMenuActive() and Menu(false) or (not menu.dialog.open and 0) or 500) or 500

        if (time == 0) then
            BlockWeaponWheelThisFrame()

            for _, v in pairs(menu.controls) do
                DisableControlAction(0, v, true)
            end
        end

        Wait(time)
    end
end)


exports('CreateNewMenu', CreateNewMenu)
exports('CreateNewDialog', CreateNewDialog)

exports('CloseDialog', function()
    Dialog(false)
end)

exports('IsMenuOpen', function()
    return menu.open
end)

exports('CloseMenu', function()
    Menu(false, {}, true)
end)
