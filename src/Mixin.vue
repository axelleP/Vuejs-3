<script>
export const IdentifiantMixin = {
    methods: {
        generateUniqueId() {
            let generateUniqueId = (Math.random() * 100) + 1;
            return generateUniqueId.toFixed(0);
        },
    }
};
</script>