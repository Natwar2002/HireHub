
export default function crudRepository(modal) {
    return {
        create: async (data) => await modal.create(data),
        getById: async (id) => await modal.findById(id),
        getByEmail: async (email) => await modal.findById(email),
        update: async (id, data) => await modal.findByIdAndUpdate(id, { $set: data }, { new: true }),
        delete: async (id) => await modal.findByIdAndDelete(id),
        getAll: async () => await modal.find()
    }
}