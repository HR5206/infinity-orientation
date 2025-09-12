<template>
    <div class="h-screen overflow-hidden grid grid-cols-5 gap-4 p-4">
        <SideBar />
        <div
            class="col-span-4 bg-white p-6 rounded-lg shadow-lg overflow-y-auto"
        >
            <NuxtRouteAnnouncer />
            <NuxtWelcome />
        </div>
    </div>
</template>
